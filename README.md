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

## Setup with docker

1. Prepare the IP address of your gateway and the security code which can be found on the label on the bottom of the device.

2. Authenticate with the gateway:

   ```bash
   docker run \
     -it \
     --rm \
     --env GATEWAY_ADDRESS=<gateway_ip_address> \
     ghcr.io/lpgera/tradfri-web-ui:main \
     npm run authenticate <security_code>
   ```

3. Use the identity and the pre-shared key from the output of the above command and create a `.env` file based on this template:

   ```dotenv
   GATEWAY_ADDRESS=<gateway_ip_address>
   IDENTITY=<identity>
   PSK=<psk>
   PORT=80
   JWT_SECRET=<long_random_string>
   PASSWORD=<your_strong_password>
   ```

4. Run the container:

   ```bash
   docker run \
     --detach \
     --env-file .env \
     -p 8080:80 \
     --restart unless-stopped \
     --name tradfri-web-ui \
     ghcr.io/lpgera/tradfri-web-ui:main
   ```

5. The app is now available on http://localhost:8080. 🎉
