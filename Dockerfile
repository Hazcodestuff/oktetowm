FROM node:lts-buster

RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp \
  libnss3 \
  libatk1.0-0 && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install snoowrap uuid whatsapp-web.js

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
