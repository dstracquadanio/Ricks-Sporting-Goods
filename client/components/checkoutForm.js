import React, {Component} from 'react'
import {connect} from 'react-redux'
import {checkoutThunk} from '../store/Cart'
import history from '../history'

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
    this.setState({
      name: this.props.user.name || '',
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

    if (this.props.user.id) {
      this.props.checkout({
        userId: this.props.user.id,
        Cart: this.props.Cart,
      })
    }
    this.setState({
      name: '',
      address: '',
      email: '',
    })
    history.push('/submitPage')
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

const mapStateToProps = (state) => {
  return {
    user: state.user,
    Cart: state.Cart,
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
