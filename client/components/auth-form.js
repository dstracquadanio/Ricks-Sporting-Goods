import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import {Button, TextField} from '@material-ui/core'
import ShopIcon from '@material-ui/icons/Shop'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  return (
    <div className="container-center-column">
      <form className="auth-container" onSubmit={handleSubmit} name={name}>
        <h2>{displayName}</h2>
        <TextField
          fullWidth
          name="email"
          required={true}
          variant="outlined"
          placeholder="Email"
        />
        <TextField
          fullWidth
          type="password"
          name="password"
          required={true}
          variant="outlined"
          placeholder="Password"
          color="secondary"
        />
        <div className="container-even-row">
          <Button type="submit" variant="contained">
            {displayName}
          </Button>
          <Button
            startIcon={<ShopIcon />}
            href="/auth/google"
            variant="contained"
            color="primary"
          >
            {displayName} with Google
          </Button>
        </div>
        {error && error.response && (
          <div className="error-message"> {error.response.data} </div>
        )}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign-Up',
    error: state.user.error,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    },
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object,
}
