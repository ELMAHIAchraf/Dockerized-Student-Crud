FROM node:18
WORKDIR /src
COPY package*.json ./
RUN npm i
COPY . ./
RUN npm run build
EXPOSE 5000
CMD [ "npm", "start"]
