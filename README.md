# Tradfri web UI

A React and GraphQL based progressive web app for connecting to a Tradfri gateway and controlling attached devices.

Check out the UI on [Chromatic](https://chromatic.com/library?appId=61753f54931d3b003a535d15&branch=master).

## Setup

1. Install dependencies: `npm i`
2. Copy the Security code from the bottom of your Tradfri gateway and generate credentials: `npm run authenticate <security code>`
3. Create a `.env` file with the following values set:

   ```dotenv
   IDENTITY=<identity>
   PSK=<psk>
   REACT_APP_SERVER_PORT=8080
   JWT_SECRET=<long_random_string>
   PASSWORD=<your_strong_password>
   ```

4. Build the frontend: `npm run build`
5. Start the server: `npm run server`
