# Stage 1 - the build process
FROM node:lts-alpine as build-deps

WORKDIR /app

# Copy package.json and package-lock.json before other files
# Take advantage od Docker cache to save re-installing dependencies if unchanged
COPY ./app/package.json .
COPY ./app/package-lock.json .

RUN npm install

COPY ./app .

RUN npm run build

# Stage 2 - the production environment
FROM nginx:1.18.0-alpine

RUN rm /etc/nginx/conf.d/*
COPY ./default.conf /etc/nginx/conf.d/

COPY --from=build-deps /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]