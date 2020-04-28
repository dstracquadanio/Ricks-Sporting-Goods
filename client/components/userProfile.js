import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateUserProfile} from '../store/user'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'

const styles = (theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    width: {
      maxWidth: 345,
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
      show: false,
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
      <div>
        <Card className={classes.width}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image="https://media.istockphoto.com/photos/all-sports-balls-in-stadium-3d-picture-id613558644?k=6&m=613558644&s=612x612&w=0&h=XmgnIstXyxQhqdSo5iW9eHtYE46uEfvwCfZZd4D3lbE="
            />
            <CardContent>
              <h1>Profile</h1>
              <h2>Name : {this.state.firstName + ' ' + this.state.lastName}</h2>
              <h2>Address : {this.state.address}</h2>
              <h2>Email : {this.state.email}</h2>
            </CardContent>
          </CardActionArea>
        </Card>
        <div>
          {this.state.show ? (
            <form
              className={`${classes.root} form-container`}
              noValidate
              autoComplete="off"
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
              <Button variant="contained" color="secondary" type="submit">
                Update
              </Button>
            </form>
          ) : null}
          <button
            type="button"
            onClick={() => {
              this.setState({show: !this.state.show})
            }}
          >
            Update Profile
          </button>
        </div>
      </div>
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
