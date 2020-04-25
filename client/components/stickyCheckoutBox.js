import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

function DisconnectedStickyCheckoutBox(props) {
  return (
    <div className="boxes container-8">
      <h3 className="container-9">Complete Order</h3>
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
        <Link to="/checkout" className="checkout">
          Checkout
        </Link>
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
