/* eslint-disable camelcase */
/* eslint-disable no-lonely-if */
import {connect} from 'react-redux'
import {checkoutThunk} from '../store/cart'
import history from '../history'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {getHistoryThunk} from '../store/user'
import CardSection from './checkoutCard'
import {useStripe, useElements, CardElement} from '@stripe/react-stripe-js'
import React, {useState, useEffect, Fragment} from 'react'
import {getClientSecret} from '../store/client'
import FlexSnackbar from './flexSnackbar'

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
})

function newCheckoutForm(props) {
  //STATE
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [address, setAddress] = useState('')
  const [email, setEmail] = useState('')
  const [errorSnackOpen, setOpen] = useState(false)

  const {classes, user} = props

  useEffect(() => {
    props.getClientSecret()
    setFirstName(user.firstName || '')
    setLastName(user.lastName || '')
    setAddress(user.address || '')
    setEmail(user.email || '')
  }, [])

  const stripe = useStripe()
  const elements = useElements()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const result = await stripe.confirmCardPayment(props.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Jenny Rosen',
        },
      },
    })

    //PAYMENT FAILED
    if (result.error) {
      await setOpen(true)
      // Show error to your customer (e.g., insufficient funds)
      console.log(result.error.message)
    }

    //SUCCESSFUL PAYMENT
    else {
      if (result.paymentIntent.status === 'succeeded') {
        await props.checkout({
          user: props.user,
          cart: props.cart,
        })
        if (props.user.id) {
          await props.addToHistory(props.user.id)
        }
        history.push('/submitPage')
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  }

  return (
    <Fragment>
      <form
        className={`${classes.root} form-container`}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <h2>Checkout</h2>

        <TextField
          id="filled-basic"
          label="First Name"
          variant="outlined"
          type="text"
          name="firstName"
          required
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Last Name"
          variant="outlined"
          type="text"
          name="lastName"
          required
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Address"
          variant="outlined"
          type="text"
          name="address"
          required
          value={address}
          onChange={(event) => setAddress(event.target.value)}
        />
        <TextField
          id="filled-basic"
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <CardSection />
        <Button
          disabled={
            !firstName.length ||
            !lastName.length ||
            !email.length ||
            !address.length
          }
          variant="contained"
          color="secondary"
          type="submit"
        >
          Submit
        </Button>
      </form>
      <FlexSnackbar
        setOpen={setOpen}
        snackState={errorSnackOpen}
        severity="warning"
        message="Wrong Credit Card Information"
      />
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cart: state.cart,
    clientSecret: state.client,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    checkout: (obj) => dispatch(checkoutThunk(obj)),
    addToHistory: (userId) => dispatch(getHistoryThunk(userId)),
    getClientSecret: () => dispatch(getClientSecret()),
  }
}
const CheckoutForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(newCheckoutForm)
export default withStyles(styles)(CheckoutForm)
