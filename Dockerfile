FROM node:10.15.0-alpine
#EXPOSE 3000 9229

WORKDIR /home/app

RUN apk update
RUN apk add bash

#COPY package.json /home/app/
#COPY package-lock.json /home/app/

#RUN npm i

#COPY . /home/app

#RUN npm start

#CMD ./scripts/start.sh