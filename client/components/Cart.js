import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const DisconnectedShoppingCart = (props) => {
  return (
    <div className="container-1">
      {props.Cart.map((item) => {
        return (
          <div key={item.id} className="container-2">
            <img src={item.imageUrl} alt="" />
            <div className="container-3">
              <div className="line-item">{item.name}</div>
              <div className="line-item">Quantity: {item.quantity}</div>
              <div className="line-item">
                Total Price: ${(item.quantity * item.price).toFixed(2)}
              </div>
            </div>
          </div>
        )
      })}
      <Link to="/checkout">Checkout</Link>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    Cart: state.Cart,
  }
}

const CheckoutForm = connect(mapStateToProps)(DisconnectedShoppingCart)

export default CheckoutForm
