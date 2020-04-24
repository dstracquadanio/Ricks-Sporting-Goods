import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'
import AccountMenu from './accountMenu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const Navbar = ({handleClick, isLoggedIn, isAdmin}) => {
  return (
    <div>
      <nav>
        <div className="left-nav">
          <AccountMenu
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            handleLogout={handleClick}
          />
          <NavLink to="/home">Rick's Sporting Goods</NavLink>
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
        <div className="right-nav">
          <NavLink to="/items">All</NavLink>
          <NavLink to="/basketball/items">Basketball</NavLink>
          <NavLink to="/football/items">Football</NavLink>
          <NavLink to="/baseball/items">Baseball</NavLink>
          <NavLink to="/eSports/items">eSports</NavLink>
          <NavLink to="/cart">
            <ShoppingCartIcon id="shopping-cart-img" fontSize="large" />
          </NavLink>
        </div>
      </nav>
      <hr />
    </div>
  )
}

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
