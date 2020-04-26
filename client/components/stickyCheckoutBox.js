import React from 'react'
import {connect} from 'react-redux'
import CompleteButton from '@material-ui/core/Button'
import history from '../history'

function DisconnectedStickyCheckoutBox(props) {
  return (
    <div className="container-8">
      {/* <h3 className="container-9">Complete Order</h3> */}
      <div className="container-9">
        <img src="/CompleteOrder.png" alt="completeOrder" />
      </div>
      <div className="container-10">
        <div className="container-11">
          <div className="padding">
            Total Items In Cart:{' '}
            {props.cart.reduce((accum, current) => {
              return accum + Number(current.quantity)
            }, 0)}
          </div>
          <div>
            Total Price: $
            {props.cart
              .reduce((accum, current) => {
                return accum + Number(current.price) * Number(current.quantity)
              }, 0)
              .toFixed(2)}
          </div>
        </div>
        <CompleteButton
          variant="contained"
          color="secondary"
          onClick={() => {
            history.push('/checkout')
          }}
        >
          Checkout
        </CompleteButton>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  }
}

const StickyCheckoutBox = connect(mapStateToProps)(
  DisconnectedStickyCheckoutBox
)

export default StickyCheckoutBox
