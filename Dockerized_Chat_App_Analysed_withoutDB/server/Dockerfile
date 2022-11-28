FROM node:alpine3.14

RUN mkdir -p /app/

WORKDIR /app/

COPY server/package.json /app/


RUN npm install 

COPY . /app/


CMD ["node","index.js"]