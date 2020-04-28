import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Button} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import {updateCartThunk} from '../store/cart'
import {checkInventoryItemToItems, attachQuantityToItem} from './utility'
import {ThemeProvider} from '@material-ui/core/styles'
import {theme1} from '../materialColorThemes'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'

export class AllItems extends Component {
  constructor() {
    super()
    this.state = {
      addCartIssue: false,
      successAlert: false,
    }
  }

  handleClick = () => {
    this.setState({
      successAlert: true,
    })
  }
  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    this.setState({
      successAlert: false,
    })
  }

  render() {
    let {items, searchBar} = this.props
    if (searchBar.length) {
      items = items.filter((item) => {
        return item.name.toLowerCase().includes(searchBar.toLowerCase())
      })
    }
    let {sport} = this.props.match.params
    items = !sport ? items : items.filter((item) => item.sport === sport)
    return (
      <div id="items">
        {items.map((item) => {
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
              {/* <div className="container-4a">
                <Link to={`/items/${item.id}`}>
                  {item.description ? <p>{item.description}</p> : ''}
                </Link>
              </div> */}
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
                      this.handleClick()
                    }
                  }}
                >
                  {item.quantity ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </ThemeProvider>
              <Snackbar
                open={this.state.successAlert}
                autoHideDuration={6000}
                onClose={this.handleClose}
              >
                <MuiAlert
                  severity="success"
                  elevation={6}
                  variant="filled"
                  onClose={this.handleClose}
                >
                  Added!
                </MuiAlert>
              </Snackbar>
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
  searchBar: state.searchBar,
})

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (obj) => dispatch(updateCartThunk(obj)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
