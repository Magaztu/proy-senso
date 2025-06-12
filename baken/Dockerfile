FROM node:18

WORKDIR /app

COPY package.json tsconfig.json ./
RUN npm install

COPY ./src ./src
RUN npx tsc

EXPOSE 3000
CMD ["node", "dist/index.js"]
