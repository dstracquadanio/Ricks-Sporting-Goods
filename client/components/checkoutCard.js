import React from 'react'
import {CardElement} from '@stripe/react-stripe-js'
import Tooltip from '@material-ui/core/Tooltip'

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
}

function CardSection() {
  return (
    <Tooltip
      arrow
      disableHoverListener
      open={true}
      placement="left"
      title="Try 4242-4242-4242-4242 MM/YY:11/21 CVC:111 zip:12345"
    >
      <label className="checkout-card-label">
        Card details
        <CardElement options={CARD_ELEMENT_OPTIONS} />
      </label>
    </Tooltip>
  )
}

export default CardSection
