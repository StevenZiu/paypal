import React, { useEffect, useState } from "react"
import scriptLoader from "react-async-script-loader"
import { withRouter } from "react-router"
import "./style.scss"

const ServerContainer = (props) => {
  const { isScriptLoaded, isScriptLoadSucceed } = props
  const [paypal, setPaypal] = useState(null)

  useEffect(() => {
    if (isScriptLoadSucceed && isScriptLoaded) {
      setPaypal(window.paypal)
    }

    if (paypal !== null) {
      paypal.Button.render(
        {
          env: "sandbox", // Or 'production'
          // Set up the payment:
          // 1. Add a payment callback
          payment: function (data, actions) {
            // 2. Make a request to your server
            return actions.request
              .post("/my-api/create-payment/")
              .then(function (res) {
                // 3. Return res.id from the response
                return res.id
              })
          },
          // Execute the payment:
          // 1. Add an onAuthorize callback
          onAuthorize: function (data, actions) {
            // 2. Make a request to your server
            return actions.request
              .post("/my-api/execute-payment/", {
                paymentID: data.paymentID,
                payerID: data.payerID,
              })
              .then(function (res) {
                // 3. Show the buyer a confirmation message.
              })
          },
        },
        "#paypal-button-container"
      )
    }
  }, [paypal, props.isScriptLoadSucceed, props.isScriptLoaded])
  return (
    <div className="checkout">
      <h1>Checkout (through server)</h1>
      <p>You are about to buy:</p>
      <p>
        <img
          className="item"
          title="Image of Cover"
          src="https://i.imgur.com/knxv5oN.jpg"
        />
        The PayPal Wars for $0.01
      </p>
      <p>Ship to:</p>
      <div className="addr">
        <p>
          5 Temasek Boulevard
          <br />
          #09-01 Suntec Tower Five
          <br />
          038985
          <br />
          Singapore
        </p>
      </div>
      <div id="paypal-button-container"></div>
    </div>
  )
}

export default scriptLoader(["https://www.paypalobjects.com/api/checkout.js"])(
  ServerContainer
)
