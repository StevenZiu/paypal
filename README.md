## PayPal Checkout Demo

This PayPal checkout demo project was bootstrapped with React. With the help of latest react hook api.

### Live demo (Hosted in Firebase)

https://client-5c15a.web.app/client-implement

### Payer Sandbox Acount for tesing

sb-rpfkd1793858@personal.example.com
pw: V?P99V>p

### Build

In the project directory, you can run:

### `npm i`

then:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Structure

#### Client Implementation

This demo project includes two way to finish PayPal checkout flow, in the client Implementation, the Smart Payment Button takes care of the whole checkout flow. Two hook functions are implemented, one is creating order which will call order api to create a new transaction, once payer approved the transaction, the capture function will capture the fund, then notify payer the transaction is done. The page will redirect to complete page with transaction detail information. The smart button will handle funding failure automatically (ask user to select other approaches).

#### Server Implementation

In the Server Side Implementation, the frontend for user is basically same, but when payer click paypal button which is actually calling our node backend to create transaction, then the backend will use paypal checkout server SDK to create order, then return the orderId to client, once payer approved the order, the frontend will tell backend to call order capture, then there is another call in the backend to get transaction detail, which will be send back to client for user reference. Same like client side implementation, the page will automatically redirect to complete page then show detail information. If there is funding failure, the client will call actions.restart to restart the flow.
