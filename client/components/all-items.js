import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {updateCartThunk} from '../store/cart'
import {attachQuantityToItem} from './utility'

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
              <Link to={`/items/${item.id}`} className="container-4">
                <h2>{item.name}</h2>
                <h3>Price: {item.price}</h3>
                <h3>Quantity: {item.quantity}</h3>
              </Link>
              <div className="container-4a">
                <Link to={`/items/${item.id}`}>
                  <img src={item.imageUrl} />
                  {item.description ? <p>{item.description}</p> : ''}
                </div>
              </Link>
              <Button startIcon={<ShoppingCartIcon />} type="button" onClick={() => {
                    let itemToSend = attachQuantityToItem(
                      item,
                      this.props.cart,
                      1
                    )
                    this.props.updateCart({
                      user: this.props.user,
                      item: itemToSend,
                    })
                  }}>
                Add to Cart
              </Button>
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
