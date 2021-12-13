FROM node:10.16.3

ENV NODE_ENV=production
ENV HOST 0.0.0.0

RUN mkdir -p /app
COPY . /app
WORKDIR /app

EXPOSE 8080

RUN npm install --production
RUN npm run build

CMD ["npm", "start"]