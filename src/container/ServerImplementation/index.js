import React, { useEffect, useState } from "react"
import scriptLoader from "react-async-script-loader"
import { withRouter } from "react-router"
import "./style.scss"
import { API_SERVER } from "../../config"
const ServerContainer = (props) => {
  const { isScriptLoaded, isScriptLoadSucceed } = props
  const [paypal, setPaypal] = useState(null)

  useEffect(() => {
    if (isScriptLoadSucceed && isScriptLoaded) {
      setPaypal(window.paypal)
    }

    if (paypal !== null) {
      paypal
        .Buttons({
          createOrder: function () {
            return fetch(`${API_SERVER}/api/v1/create-paypal-transaction`, {
              method: "post",
              headers: {
                "content-type": "application/json",
              },
            })
              .then(function (res) {
                return res.json()
              })
              .then(function (data) {
                return data.orderID // Use the same key name for order ID on the client and server
              })
          },
          onApprove: (data, actions) => {
            return fetch(`${API_SERVER}/api/v1/capture-paypal-transaction`, {
              method: "post",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                orderID: data.orderID,
              }),
            })
              .then((res) => {
                return res.json()
              })
              .then((details) => {
                console.log(details)
                if (details.error === "INSTRUMENT_DECLINED") {
                  return actions.restart()
                }
                if (details.status === "COMPLETED") {
                  props.history.push("/order-complete", details)
                  console.log(details)
                }
              })
          },
        })
        .render("#paypal-button-container")
    }
  }, [paypal, props.isScriptLoadSucceed, props.isScriptLoaded])
  return (
    <div>
      <div className="checkout">
        <h1>Checkout (through server)</h1>
        <p>You are about to buy:</p>
        <p>
          <img
            className="item"
            title="Image of Cover"
            src="https://i.imgur.com/knxv5oN.jpg"
          />
          The PayPal Wars for $0.36
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
        Sdk is loaded in the server side, once transaction is approved by payer,
        the server side will fire another api call to get the transaction
        detail, then return the ddetail information to client, which will be
        rendered in the success redirect page. For fail funding, the client will
        automatically restart the flow by calling actions.restart(). <br />
        Once transaction capture success, the page will automatically redirect
        to complete page.
        <br />
        Sandbox account to test:
        <span>Email: sb-rpfkd1793858@personal.example.com</span>
        <span>PW: V?P99V>p</span>
      </div>
    </div>
  )
}

export default scriptLoader([
  "https://www.paypal.com/sdk/js?client-id=AfamcRs0Q98lGnLwF-GsUC5ghfqpZ_kO2GvXLmHVvmgxlJ__SMwvO3-eu4cQevj7MUlp5x9CTQeKwChV",
])(withRouter(ServerContainer))
