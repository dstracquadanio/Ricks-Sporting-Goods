import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {updateUserProfile} from '../store/user'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import AccountCircleIcon from '@material-ui/icons/AccountCircle'
import FlexSnackbar from './flexSnackbar'

class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      email: '',
      show: false,
      // snackOpen: false,
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.setState = this.setState.bind(this)
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
    return (
      <Fragment>
        <div className="user-container0">
          <div className="user-container1">
            <div className="user-img-container">
              <img
                src="https://media.istockphoto.com/photos/all-sports-balls-in-stadium-3d-picture-id613558644?k=6&m=613558644&s=612x612&w=0&h=XmgnIstXyxQhqdSo5iW9eHtYE46uEfvwCfZZd4D3lbE="
                alt=""
              />
            </div>
            <div className="user-container2">
              <AccountCircleIcon color="disabled" id="account-icon" />
              <div className="user-container3">
                <div className="user-info">
                  {this.props.user.firstName !== null
                    ? this.props.user.firstName
                    : ''}{' '}
                  {this.props.user.lastName !== null &&
                    this.props.user.lastName}
                </div>
                <div className="user-info">{this.props.user.address}</div>
                <div className="user-info">{this.props.user.email}</div>
              </div>
            </div>
            <div>
              <form
                className="form-container-user"
                onSubmit={this.handleSubmit}
              >
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
                <div className="update-icon-container">
                  <Button
                    variant="contained"
                    color="secondary"
                    id="update-icon"
                    type="submit"
                  >
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* <FlexSnackbar
          setOpen={this.state.snackOpen}
          snackState={this.setState}
          severity="warning"
          message="Wrong Credit Card Information"
        /> */}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch) => ({
  updateUserProfile: (id, changes) => dispatch(updateUserProfile(id, changes)),
})

const UserForm = connect(mapStateToProps, mapDispatchToProps)(UserProfile)

export default UserForm
