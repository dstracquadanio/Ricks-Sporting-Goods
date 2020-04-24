import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink, Switch} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => (
  <div>
    <nav>
      {isLoggedIn ? (
        <div className="left-nav">
          {/* The navbar will show these links after you log in */}
          <NavLink to="/home">Rick's Sporting Goods</NavLink>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
          {isAdmin ? (
            <Fragment>
              <NavLink to="/users">VIEW USERS</NavLink>
              <NavLink to="/additems">ADD AN ITEM</NavLink>
              <NavLink to="/updateitems">UPDATE/REMOVE ITEM</NavLink>
            </Fragment>
          ) : (
            ''
          )}
        </div>
      ) : (
        <div className="left-nav">
          {/* The navbar will show these links before you log in */}
          <NavLink to="/home">Rick's Sporting Goods</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </div>
      )}
      <div className="right-nav">
        <NavLink to="/items">All</NavLink>
        <NavLink to="/basketball/items">Basketball</NavLink>
        <NavLink to="/football/items">Football</NavLink>
        <NavLink to="/baseball/items">Baseball</NavLink>
        <NavLink to="/eSports/items">eSports</NavLink>
        <NavLink to="/cart">
          <img
            id="shopping-cart-img"
            src="https://www.freepngimg.com/thumb/cart/2-2-cart-png-file.png"
            alt="cart image"
          />
        </NavLink>
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
