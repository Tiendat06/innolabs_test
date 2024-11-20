FROM node:20.11.1-alpine
WORKDIR /src/app

COPY package*.json ./
RUN npm install --production

COPY . .
EXPOSE 3000
ENV PORT=3000
ENV SWAGGER_PORT=80

ENV MONGO_HOST=mongodb
ENV MONGO_PORT=27017
ENV MONGO_DB=innolabs_test

ENV REDIS_HOST=redis
ENV REDIS_PORT=6379

ENV MAIL_SERVER=smtp.gmail.com
ENV MAIL_USERNAME=tiendat79197@gmail.com
ENV MAIL_PASSWORD="xwrz ncpn nosk tqhw"
ENV MAIL_PORT=587

CMD ["npm", "start"]