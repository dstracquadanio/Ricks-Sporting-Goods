import React from 'react'
import {Elements} from '@stripe/react-stripe-js'
import {loadStripe} from '@stripe/stripe-js'
import CheckoutForm from './newCheckoutForm'

const stripePromise = loadStripe('pk_test_f8MjNwxrboi3yGU26WJ9MwoF004ndbJxV7')

export default function CheckoutWrapper() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  )
}
