FROM node:lts-alpine

WORKDIR /app

# Copy package.json and package-lock.json before other files
# Take advantage od Docker cache to save re-installing dependencies if unchanged
COPY package.json ./app
COPY package-lock.json ./app

RUN npm install --production

COPY ./app /app

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]