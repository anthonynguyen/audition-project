FROM alpine

RUN apk upgrade --update
RUN apk add nodejs

RUN mkdir /app
WORKDIR /app
COPY . /app
RUN npm install

EXPOSE 3000
CMD [ "node", "index.js" ]
