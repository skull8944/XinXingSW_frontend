FROM node:14

ENV APP_HOME /app
WORKDIR $APP_HOME
COPY ./ $APP_HOME

RUN apt-get -y update
RUN npm install

EXPOSE 3000

CMD npm start
# docker build -t xinxing_sw_frontend .
# docker image rm xinxing_sw_frontend -f
# docker run -p 3000:3000 --net host xinxing_sw_frontend
# install sqlite3