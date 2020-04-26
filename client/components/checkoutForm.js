import React, {Component} from 'react'
import {connect} from 'react-redux'
import {checkoutThunk} from '../store/cart'
import history from '../history'

class DisconnectedCheckoutForm extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      firstName: this.props.user.firstName || '',
      lastName: this.props.user.lastName || '',
      address: this.props.user.address || '',
      email: this.props.user.email || '',
    })
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.checkout({
      user: this.props.user,
      cart: this.props.cart,
    })

    this.setState({
      firstName: '',
      lastName: '',
      address: '',
      email: '',
    })
    history.push('/submitPage')
  }

  render() {
    return (
      <form className="form-container" onSubmit={this.handleSubmit}>
        <h2>Checkout</h2>
        <label htmlFor="firstName">First Name: </label>
        <input
          type="text"
          name="firstName"
          required
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <label htmlFor="lastName">Last Name: </label>
        <input
          type="text"
          name="lastName"
          required
          value={this.state.lastName}
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cart: state.cart,
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
