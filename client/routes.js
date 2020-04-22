import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserHome,
  CheckoutForm,
  ShoppingCart,
  SubmitPage,
} from './components'
import AllItems from './components/all-items'
import singleItem from './components/singleItem'
import {me} from './store'
import {getItems} from './store/items'
import {getCartThunk} from './store/shoppingCart'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.getItems()
  }

  render() {
    const {isLoggedIn} = this.props
    // put this on the /me route
    if (isLoggedIn) {
      this.props.getCartItems(this.props.user.id)
    }
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/items" component={AllItems} />
        <Route path="/:sport/items" component={AllItems} />
        <Route path="/items/:id" component={singleItem} />
        <Route path="/ShoppingCart" component={ShoppingCart} />
        <Route path="/checkout" component={CheckoutForm} />
        <Route path="/submitPage" component={SubmitPage} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    user: state.user,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getItems: () => dispatch(getItems()),
    getCartItems: (userId) => dispatch(getCartThunk(userId)),
    loadInitialData() {
      dispatch(me())
    },
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
}
