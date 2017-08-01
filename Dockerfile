FROM node:alpine

ADD ./ /app

RUN cd /app \
  && npm i --registry=https://registry.npm.taobao.org \
  && npm run build \
  && rm -rf /app/node_modules \
  && npm i --production \
  && sh ./clear.sh
CMD ["node", "/app/app"]