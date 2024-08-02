FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm i
RUN npm install --save-dev typescript ts-node
COPY . ./
RUN npm run build
EXPOSE 3001
CMD ["node", "dist/server.js"]
