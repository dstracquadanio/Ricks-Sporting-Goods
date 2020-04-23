import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {updateCartThunk} from '../store/cart'

export class AllItems extends Component {
  render() {
    let {items} = this.props
    let {sport} = this.props.match.params
    items = !sport ? items : items.filter((item) => item.sport === sport)
    return (
      <div id="items">
        {items.map((item) => {
          return (
            <div key={item.id} className="singleItem">
              <Link to={`/items/${item.id}`}>
                <h2>{item.name}</h2>
                <div className="container-4">
                  <h3>Price: {item.price}</h3>
                  <h3>Quantity: {item.quantity}</h3>
                  <img src={item.imageUrl} />
                  {item.description ? <p>{item.description}</p> : ''}
                </div>
              </Link>
              <button
                type="button"
                onClick={() => {
                  let itemToSend = {...item}
                  let itemInCart = this.props.cart.filter(
                    (cartItem) => cartItem.itemId === itemToSend.id
                  )[0]
                  if (itemInCart) {
                    itemToSend.quantity = itemInCart.quantity + 1
                  } else {
                    itemToSend.quantity = 1
                  }
                  this.props.updateCart({
                    user: this.props.user,
                    item: itemToSend,
                  })
                }}
              >
                Add Item To Cart
              </button>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.items,
  user: state.user,
  cart: state.cart,
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (obj) => dispatch(updateCartThunk(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
