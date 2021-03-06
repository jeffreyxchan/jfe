FROM alpine:3.7

RUN apk update && apk add nodejs

RUN mkdir /app

COPY *.json /app/
RUN cd /app && npm install --production

COPY . /app

WORKDIR /app

EXPOSE 80
CMD ["node", "app.js"]
