# CryptoPrices

The aim of this project is to create an Web Application that displays the historical data of Bitcoin prices. Things that are relevant for this project:

- Scalability: consider scenarios where this project could be subject to high traffic and needs to be easily deployed on a number of servers
- Timezone aware: it should take into consideration the local time of the user


## Architecture

> TODO: add diagram and reasoning

## Setup

### Backend

1. Open a console ang go into the Backend/app directory:

    ```
    cd  cryptoprices/Backend
    ```

2. Build the docker image for the backend

    ```
    docker build -t cryptoprices-api-image ./
    ```

3. Run the docker container

    **Development**

    ```
    docker run -e API_KEY=YOUR_API_KEY -d --name cryptoprices-api -p 80:80 -v $(pwd):/app cryptoprices-api-image /start-reload.sh
    ```

    **Production**

    ```
    docker run -e API_KEY=YOUR_API_KEY -d --name cryptoprices-api -p 80:80 cryptoprices-api-image
    ```

    where `YOUR_API_KEY` should be obtained from [coinapi.io](https://coinapi.io)

4. You can access the api docs on [http://127.0.0.1/docs](http://127.0.0.1/docs)