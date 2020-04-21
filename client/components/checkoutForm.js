import React, {Component} from 'react'
import {connect} from 'react-redux'
import {checkoutThunk} from '../store/shoppingCart'

class DisconnectedCheckoutForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      address: '',
      email: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.setState({
        name: this.props.user.name,
        address: this.props.user.address,
        email: this.props.user.email,
      })
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()

    if (this.props.user.id) {
      this.props.checkout({
        userId: this.props.user.id,
        shoppingCart: this.props.shoppingCart,
      })
    }
    this.setState({
      name: '',
      address: '',
      email: '',
    })
  }

  render() {
    return (
      <form className="form-container" onSubmit={this.handleSubmit}>
        <h2>Checkout</h2>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          name="name"
          required
          value={this.state.name}
          onChange={this.handleChange}
        />
        <label htmlFor="address">Address: </label>
        <input
          type="text"
          name="address"
          required
          value={this.state.address}
          onChange={this.handleChange}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          required
          value={this.state.email}
          onChange={this.handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

// ********** TEST DATA. DELETE WHEN DONE USING **************
const userTest = {
  id: 1,
  name: 'Cam',
  address: 'address 1',
  email: 'myemail@email.com',
}
const guestTest = {}

const cartTest = [
  {
    id: 2,
    name: 'basketball hoop',
    quantity: 2,
    price: 10.0,
    sport: 'basketball',
  },
  {id: 1, name: 'football helmet', quantity: 1, price: 30.0, sport: 'football'},
  {id: 3, name: 'football', quantity: 1, price: 25.0, sport: 'football'},
]
// ***************************************************************

const mapStateToProps = (state) => {
  return {
    // user: state.user,
    // items: state.items
    // shoppingCart: state.shoppingCart
    user: userTest,
    shoppingCart: cartTest,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkout: (obj) => dispatch(checkoutThunk(obj)),
  }
}

const CheckoutForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedCheckoutForm)

export default CheckoutForm
