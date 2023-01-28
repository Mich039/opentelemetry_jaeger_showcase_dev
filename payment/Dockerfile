FROM node
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
ENV NODE_PORT 7777
ENV OTEL_PORT 4318
EXPOSE $NODE_PORT
EXPOSE $OTEL_PORT
CMD node --require './tracer.js' index.js