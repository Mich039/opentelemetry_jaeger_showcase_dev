FROM python:3.11.1

WORKDIR /usr/src/app

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

RUN pip list

COPY app.py ./

CMD [ "waitress-serve","--port=6789","--call", "app:create_app"]

EXPOSE 6789