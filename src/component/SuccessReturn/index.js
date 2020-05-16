import React from "react"
import { withRouter } from "react-router-dom"
import "./style.scss"

const SuccessReturn = (props) => {
  const { state = {} } = props.location
  return (
    <div className="checkout">
      <h1>Checkout Completed</h1>
      <p>You are about to buy:</p>
      <p>
        <img
          className="item"
          title="Image of Cover"
          src="https://i.imgur.com/knxv5oN.jpg"
        />
        The PayPal Wars for $0.369
      </p>
      <p>Order placed successfully</p>
      <p>
        PayPal Transaction ID:
        <b> {state.id ? state.id : null}</b>
      </p>
      <p>
        Time:
        <b> {state.create_time ? state.create_time : null}</b>
      </p>
      <p>
        Payer:
        <b> {state.payer.name ? state.payer.name.given_name : null}</b>
      </p>
      <p>
        Payer Email:
        <b> {state.payer.email_address ? state.payer.email_address : null}</b>
      </p>
    </div>
  )
}

export default withRouter(SuccessReturn)
