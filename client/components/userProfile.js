import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUserProfile} from '../store/user'
// import history from '../history'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
})

class UserProfile extends Component {
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

    this.props.updateUserProfile(this.props.user.id, this.state)
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
        <h2>Profile</h2>
        <h2>{this.state.firstName + ' ' + this.state.lastName}</h2>
        <h2>{this.state.address}</h2>
        <h2>{this.state.email}</h2>
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
          Update
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

const mapDispatchToProps = (dispatch) => ({
  updateUserProfile: (id, changes) => dispatch(updateUserProfile(id, changes)),
})

const UserForm = connect(mapStateToProps, mapDispatchToProps)(UserProfile)

export default withStyles(styles)(UserForm)
