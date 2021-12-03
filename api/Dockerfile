FROM node:alpine as server-build
WORKDIR /app
ADD package.json /app
RUN npm install && npm cache clean --force
EXPOSE 9000
ADD . /app
CMD ["node", "bin/www"]