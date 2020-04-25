import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeCartItemThunk, editCartThunk} from '../store/cart'
import {
  attachQuantityToCartItem,
  checkInventoryCartItemToItems,
} from './utility'
import StickyCheckoutBox from './stickyCheckoutBox'

class DisconnectedCart extends Component {
  constructor() {
    super()
    this.state = {
      addCartIssue: false,
      message: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    let userId = this.props.cart[0].userId
    this.props.removeCartItem(userId, +event.target.value)
  }

  render() {
    return (
      <div className="container-7">
        <div className="container-1">
          {this.props.cart.map((item) => {
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

                    {/* PLUS AND MINUS LOGIC */}
                    <div className="container-6">
                      <div
                        className="plus"
                        onClick={async () => {
                          await this.setState({
                            addCartIssue: false,
                            message: '',
                          })
                          let check = checkInventoryCartItemToItems(
                            item,
                            this.props.items,
                            this.props.cart,
                            1
                          )
                          if (check) {
                            await this.setState({
                              addCartIssue: check,
                              message: 'Not enough in stock!',
                            })
                          }
                          if (!this.state.addCartIssue) {
                            let itemToSend = attachQuantityToCartItem(
                              item,
                              this.props.cart,
                              1
                            )
                            this.props.updateCart({
                              user: this.props.user,
                              item: itemToSend,
                            })
                          }
                        }}
                      >
                        +
                      </div>
                      <div
                        className="minus"
                        onClick={async () => {
                          await this.setState({
                            addCartIssue: false,
                            message: '',
                          })
                          let quantityCheck =
                            this.props.cart.filter((cartItem) => {
                              return cartItem.itemId === item.itemId
                            })[0].quantity - 1
                          if (quantityCheck < 1) {
                            await this.setState({
                              addCartIssue: item.itemId,
                              message: "Can't be less than 1!",
                            })
                          } else {
                            let itemToSend = attachQuantityToCartItem(
                              item,
                              this.props.cart,
                              -1
                            )
                            this.props.updateCart({
                              user: this.props.user,
                              item: itemToSend,
                            })
                          }
                        }}
                      >
                        -
                      </div>
                    </div>
                  </div>
                  {this.state.addCartIssue === item.itemId ? (
                    <div className="error">{this.state.message}</div>
                  ) : (
                    <div> </div>
                  )}
                </div>
                <button
                  type="button"
                  value={item.itemId}
                  onClick={this.handleSubmit}
                >
                  Remove Item From Cart
                </button>
              </div>
            )
          })}
        </div>
        <StickyCheckoutBox />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    user: state.user,
    items: state.items,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (obj) => dispatch(editCartThunk(obj)),
    removeCartItem: (userId, itemId) =>
      dispatch(removeCartItemThunk(userId, itemId)),
  }
}

const Cart = connect(mapStateToProps, mapDispatchToProps)(DisconnectedCart)

export default Cart
