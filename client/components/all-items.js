import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {updateCartThunk} from '../store/cart'
import {checkInventoryItemToItems, attachQuantityToItem} from './utility'
import {ThemeProvider} from '@material-ui/core/styles'
import {theme1} from '../materialColorThemes'
import Paginate from './paginate'

export class AllItems extends Component {
  constructor() {
    super()
    this.state = {
      addCartIssue: false,
      currentPage: 1,
      itemsPerPage: 15,
    }
  }

  render() {
    let {items, searchBar} = this.props
    // binary search?
    if (searchBar.length) {
      items = items.filter((item) => {
        return item.name.toLowerCase().includes(searchBar.toLowerCase())
      })
    }
    let {sport} = this.props.match.params
    items = !sport ? items : items.filter((item) => item.sport === sport)
    const indexOfLastItem = this.state.currentPage * this.state.itemsPerPage
    const indexOfFirstItem = indexOfLastItem - this.state.itemsPerPage
    let currentItems = items.slice(indexOfFirstItem, indexOfLastItem)
    return (
      <div id="items">
        {currentItems.map((item) => {
          return (
            <div key={item.id} className="singleItem">
              <Link to={`/items/${item.id}`} className="container-4">
                <div className="image-container">
                  <img src={item.imageUrl} />
                </div>
                <h2>{item.name}</h2>
                <h3>Price: ${item.price}</h3>
                <h3>In Stock: {item.quantity}</h3>
                {this.state.addCartIssue === item.id && (
                  <div className="error">Not enough in stock!</div>
                )}
              </Link>
              <ThemeProvider theme={theme1}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<ShoppingCartIcon />}
                  type="button"
                  disabled={!item.quantity}
                  onClick={async () => {
                    let check = checkInventoryItemToItems(
                      item,
                      this.props.items,
                      this.props.cart,
                      1
                    )
                    await this.setState({
                      addCartIssue: check,
                    })
                    if (!this.state.addCartIssue) {
                      let itemToSend = attachQuantityToItem(
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
                  {item.quantity ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </ThemeProvider>
            </div>
          )
        })}
        <Paginate
          itemsPerPage={this.state.itemsPerPage}
          totalItems={items.length}
          paginator={(pageNum) => this.setState({currentPage: pageNum})}
          props={this.props}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  items: state.items,
  user: state.user,
  cart: state.cart,
  searchBar: state.searchBar,
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (obj) => dispatch(updateCartThunk(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
