FROM node:alpine

#docker build -t xxxxx/yyyyyy .
#docker push xxxxx/yyyyyy
#docker run -d --name tora_list --restart=always -p 3000:3000 xxxxxx/yyyyyyy

EXPOSE 3000

WORKDIR /app
ADD package.json /app/
RUN npm install
ADD . /app

CMD []
ENTRYPOINT ["npm", "start"]