FROM node:alpine3.14

RUN mkdir -p /app/

WORKDIR /app/

COPY frontend/package.json /app/

RUN npm install 

COPY . /app/

CMD ["node","index.js"]