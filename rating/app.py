import os

from flask import Flask, jsonify, request
from opentelemetry import trace
from opentelemetry.instrumentation.flask import FlaskInstrumentor
from opentelemetry.sdk.resources import SERVICE_NAME, Resource
from opentelemetry.sdk.trace import TracerProvider
from opentelemetry.exporter.otlp.proto.grpc.trace_exporter import OTLPSpanExporter
from opentelemetry.sdk.trace.export import BatchSpanProcessor

app = Flask(__name__)
FlaskInstrumentor().instrument_app(app)

trace.set_tracer_provider(TracerProvider(resource=Resource.create({SERVICE_NAME: "rating"})))
trace.get_tracer_provider().add_span_processor(
    BatchSpanProcessor(OTLPSpanExporter())
)

# Dict of with movie id key and dict as value
# The second dict has user id as key and rating as value
ratings = dict()

def create_app():
   return app

@app.route("/addRating", methods=['PUT'])
def addRating():
    payload = request.get_json()
    movie_id = int(payload['movie_id'])
    user_id = int(payload['user_id'])
    rating = int(payload['rating'])

    #TODO: Check for movie
    #TODO: Check for user
    #Check rating between 0 and 5
    if rating > 5 or rating < 0:
        return jsonify({"error:":"Invalid Rating. Rating must be betweewn 0 and 5"}), 400

    if movie_id in ratings:
        ratings[movie_id][user_id] = rating
    else:
        ratings[movie_id] = {user_id:rating}

    return "",201

@app.route("/getMovieRatings", methods=['GET'])
def getMovieRatings():
    movie_id = int(request.args.get('movie_id'))

    movie_ratings = ratings.get(movie_id,None)

    if(movie_ratings):
        return jsonify(movie_ratings)
    else:
        return jsonify({"error:":"Movie not found"}), 404