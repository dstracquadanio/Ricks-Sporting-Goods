import React, {Component, Fragment} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'

import {Login, Signup, UserHome, CheckoutForm, Cart, SubmitPage} from './index'
import AllItems from './all-items'
import ViewUsers from './viewUsers'
import singleItem from './singleItem'
import addItems from './addItems'
import itemList from './itemList'
import updateItems from './updateItems'
import userProfile from './userProfile'
import {me} from '../store'
import {getItems} from '../store/items'
import {getCartThunk} from '../store/cart'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'

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
    const {isAdmin} = this.props
    const load = this.props.load
    return (
      <Fragment>
        {load && (
          <Backdrop open={load}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}
        <Switch>
          {/* Routes placed here are available to all visitors */}
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route exact path="/items" component={AllItems} />
          <Route path="/:sport/items" component={AllItems} />
          <Route path="/items/:id" component={singleItem} />
          <Route path="/cart" component={Cart} />
          <Route path="/checkout" component={CheckoutForm} />
          <Route path="/submitPage" component={SubmitPage} />
          <Route path="/home" component={UserHome} />
          {isLoggedIn && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route exact path="/users/profile" component={userProfile} />
              {isLoggedIn && isAdmin && (
                <Switch>
                  <Route path="/users" component={ViewUsers} />
                  <Route path="/addItems" component={addItems} />
                  <Route exact path="/updateitems" component={itemList} />
                  <Route path="/updateitems/:id" component={updateItems} />
                  <Route component={UserHome} />
                </Switch>
              )}
              <Route component={UserHome} />
            </Switch>
          )}
          {/* Displays our Login component as a fallback */}
          <Route component={UserHome} />
          {/* we want the url to show /home when catching all */}
        </Switch>
      </Fragment>
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
    isAdmin: !!state.user.isAdmin,
    user: state.user,
    load: state.load,
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
  isAdmin: PropTypes.bool.isRequired,
}
