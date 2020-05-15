import React, { useEffect, useState } from "react"
import scriptLoader from "react-async-script-loader"
import { withRouter } from "react-router"
import "./style.scss"
const ClientContainer = (props) => {
  const { isScriptLoaded, isScriptLoadSucceed } = props
  const [paypal, setPaypal] = useState(null)

  useEffect(() => {
    if (isScriptLoadSucceed && isScriptLoaded) {
      setPaypal(window.paypal)
    }
    // render paypal button once sdk load successfully
    if (paypal !== null) {
      paypal
        .Buttons({
          createOrder: (data, actions) => {
            // This function sets up the details of the transaction, including the amount and line item details.
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: "0.1",
                  },
                },
              ],
            })
          },
          onApprove: (data, actions) => {
            // This function captures the funds from the transaction.
            return actions.order.capture().then(function (details) {
              // This function shows a transaction success message to your buyer.
              // alert("Transaction completed by " + details.payer.name.given_name)
              props.history.push("/order-complete", { ...details })
            })
          },
        })
        .render("#paypal-button-container")
    }
    // This function displays Smart Payment Buttons on your web page.
  }, [paypal, props.isScriptLoadSucceed, props.isScriptLoaded])

  return (
    <div>
      <div className="checkout">
        <h1>Checkout</h1>
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
      <div className="explain">
        As the client implmentation of PayPal sdk will automatically handle the
        funding failures, so no customize step here. Sandbox account to test:
        <span>Email: sb-rpfkd1793858@personal.example.com</span>
        <span>PW: V?P99V>p</span>
      </div>
    </div>
  )
}

// load SDK for smart checkout button
export default scriptLoader([
  "https://www.paypal.com/sdk/js?client-id=AfamcRs0Q98lGnLwF-GsUC5ghfqpZ_kO2GvXLmHVvmgxlJ__SMwvO3-eu4cQevj7MUlp5x9CTQeKwChV",
])(withRouter(ClientContainer))
