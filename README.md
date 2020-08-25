# CryptoPrices

The aim of this project is to create an Web Application that displays the historical data of Bitcoin prices. Things that are relevant for this project:

- Scalability: consider scenarios where this project could be subject to high traffic and needs to be easily deployed on a number of servers
- Timezone aware: it should take into consideration the local time of the user


## Architecture

> TODO: add diagram and reasoning

## Setup

1. Open a terminal and go to the repository folder:

    ```
    cd cryptoprices 
    ```

2. Build the docker image

    ```
    docker-compose build
    ```

3. Run the docker container

    ```
    API_KEY=YOUR_API_KEY docker-compose up -d
    ```

    where `YOUR_API_KEY` should be obtained from [coinapi.io](https://coinapi.io)

4. You should be able to access the app on [http://localhost](http://localhost)