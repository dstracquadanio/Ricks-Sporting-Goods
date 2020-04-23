import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {removeCartItemThunk} from '../store/Cart'

const DisconnectedCart = (props) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    let userId = props.cart[0].userId
    props.removeCartItem(userId, +event.target.value)
  }

  return (
    <div className="container-1">
      {props.cart.map((item) => {
        return (
          <div key={item.itemId} className="container-2">
            <img src={item.imageUrl} alt="" />
            <div className="container-3">
              <div className="line-item">{item.name}</div>
              <div className="line-item">Quantity: {item.quantity}</div>
              <div className="line-item">
                Total Price: ${(item.quantity * item.price).toFixed(2)}
              </div>
              <button type="button" value={item.itemId} onClick={handleSubmit}>
                Remove Item From Cart
              </button>
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
    cart: state.cart,
  }
}

const mapDispatchToProps = (dispatch) => ({
  removeCartItem: (userId, itemId) =>
    dispatch(removeCartItemThunk(userId, itemId)),
})

const Cart = connect(mapStateToProps, mapDispatchToProps)(DisconnectedCart)

export default Cart
