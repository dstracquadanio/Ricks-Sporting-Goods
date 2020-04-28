import React, {Component} from 'react'
import {connect} from 'react-redux'
import {checkoutThunk} from '../store/cart'
import history from '../history'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import {getHistoryThunk} from '../store/user'

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      // width: '25ch',
    },
  },
})
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
  async handleSubmit(event) {
    event.preventDefault()
    await this.props.checkout({
      user: this.props.user,
      cart: this.props.cart,
    })
    if (this.props.user.id) {
      await this.props.addToHistory(this.props.user.id)
    }
    this.setState({
      firstName: '',
      lastName: '',
      address: '',
      email: '',
    })
    history.push('/submitPage')
  }
  render() {
    const {classes} = this.props
    return (
      <form
        className={`${classes.root} form-container`}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        <h2>Checkout</h2>
        <TextField
          id="filled-basic"
          label="First Name"
          variant="filled"
          type="text"
          name="firstName"
          required
          value={this.state.firstName}
          onChange={this.handleChange}
        />
        <TextField
          id="filled-basic"
          label="Last Name"
          variant="filled"
          type="text"
          name="lastName"
          required
          value={this.state.lastName}
          onChange={this.handleChange}
        />
        <TextField
          id="filled-basic"
          label="Address"
          variant="filled"
          type="text"
          name="address"
          required
          value={this.state.address}
          onChange={this.handleChange}
        />
        <TextField
          id="filled-basic"
          label="Email"
          variant="filled"
          type="email"
          name="email"
          required
          value={this.state.email}
          onChange={this.handleChange}
        />
        <Button variant="contained" color="secondary" type="submit">
          Submit
        </Button>
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
    addToHistory: (userId) => dispatch(getHistoryThunk(userId)),
  }
}
const CheckoutForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedCheckoutForm)
export default withStyles(styles)(CheckoutForm)
