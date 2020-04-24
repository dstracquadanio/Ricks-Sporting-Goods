import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {editCartThunk} from '../store/cart'
import {attachQuantityToCartItem} from './utility'

const DisconnectedCart = (props) => {
  return (
    <div className="container-7">
      <div className="container-1">
        {props.cart.map((item) => {
          return (
            <div key={item.itemId} className="container-2">
              <img src={item.imageUrl} alt="" />
              <div className="container-3">
                <div className="line-item">{item.name}</div>
                <div className="line-item">
                  Total Price: ${(item.quantity * item.price).toFixed(2)}
                </div>
                <div className="line-item container-5">
                  <div>Quantity: {item.quantity}</div>
                  <div className="container-6">
                    <div
                      className="plus"
                      onClick={() => {
                        let itemToSend = attachQuantityToCartItem(
                          item,
                          props.cart,
                          1
                        )
                        props.updateCart({
                          user: props.user,
                          item: itemToSend,
                        })
                      }}
                    >
                      +
                    </div>
                    <div
                      className="minus"
                      onClick={() => {
                        let itemToSend = attachQuantityToCartItem(
                          item,
                          props.cart,
                          -1
                        )
                        props.updateCart({
                          user: props.user,
                          item: itemToSend,
                        })
                      }}
                    >
                      -
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="boxes container-8">
        <h3 className="container-9">Complete Order!</h3>
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
                  return (
                    accum + Number(current.price) * Number(current.quantity)
                  )
                }, 0)
                .toFixed(2)}
            </div>
          </div>
          <Link to="/checkout" className="checkout">
            Checkout
          </Link>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (obj) => dispatch(editCartThunk(obj)),
  }
}

const Cart = connect(mapStateToProps, mapDispatchToProps)(DisconnectedCart)

export default Cart
