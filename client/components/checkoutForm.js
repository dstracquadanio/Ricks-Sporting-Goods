import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {addCampusThunk} from '../redux/campuses'

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
    this.props.addCampus(this.state)
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
  email: 'my email',
}
const guestTest = {}
// ***************************************************************

const mapStateToProps = (state) => {
  return {
    // user: state.user,
    user: userTest,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // addCampus: obj => dispatch(addCampusThunk(obj)),
  }
}

const CheckoutForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedCheckoutForm)

export default CheckoutForm
