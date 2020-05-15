import React from "react"
import { withRouter } from "react-router-dom"
import "./style.scss"

const SuccessReturn = (props) => {
  const { state = {} } = props.location
  return (
    <div class="checkout">
      <h1>Checkout Completed</h1>
      <p>You are about to buy:</p>
      <p>
        <img
          className="item"
          title="Image of Cover"
          src="https://i.imgur.com/knxv5oN.jpg"
        />
        The PayPal Wars for $65.00
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
    </div>
  )
}

export default withRouter(SuccessReturn)
