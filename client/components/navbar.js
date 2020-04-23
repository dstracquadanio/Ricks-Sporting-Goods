import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link, Switch} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <h1>Grace Shopper</h1>
    <nav>
      {isLoggedIn ? (
        <div className="left-nav">
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          {isAdmin ? (
            <Fragment>
              <Link to="/users">VIEW USERS</Link>
              <Link to="/additems">ADD AN ITEM</Link>
              <Link to="/updateitems">UPDATE/REMOVE ITEM</Link>
            </Fragment>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div className="left-nav">
          {/* The navbar will show these links before you log in */}
          <Link to="/home">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      )}
      <div className="right-nav">
        <Link to="/items">All</Link>
        <Link to="/basketball/items">Basketball</Link>
        <Link to="/football/items">Football</Link>
        <Link to="/baseball/items">Baseball</Link>
        <Link to="/eSports/items">eSports</Link>
        <Link to="/shoppingCart">
          <img
            id="shopping-cart-img"
            src="https://www.freepngimg.com/thumb/cart/2-2-cart-png-file.png"
            alt="cart image"
          />
        </Link>
      </div>
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
}
