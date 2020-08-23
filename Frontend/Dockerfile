FROM node:lts-alpine

WORKDIR /app

# Copy package.json and package-lock.json before other files
# Take advantage od Docker cache to save re-installing dependencies if unchanged
COPY ./app/package.json ./
COPY ./app/package-lock.json ./

RUN npm install --production

COPY ./app ./

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]