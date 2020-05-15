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
          onApprove: (data) => {
            console.log(data)
            return fetch(`${API_SERVER}/api/v1/capture-paypal-transaction`, {
              method: "post",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify({
                orderID: data.orderID,
              }),
            }).then((res) => {
              if (res.status === 200) {
                console.log(props)
                props.history.push("/order-complete")
              }
              console.log(res)
              // return res.json()
            })
            // .then(function (details) {
            //   console.log(details)
            //   // if (details.error === "INSTRUMENT_DECLINED") {
            //   //   return actions.restart()
            //   // }
            //   alert("Transaction approved by " + details.payer_given_name)
            // })
          },
        })
        .render("#paypal-button-container")
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

export default scriptLoader([
  "https://www.paypal.com/sdk/js?client-id=AfamcRs0Q98lGnLwF-GsUC5ghfqpZ_kO2GvXLmHVvmgxlJ__SMwvO3-eu4cQevj7MUlp5x9CTQeKwChV",
])(withRouter(ServerContainer))
