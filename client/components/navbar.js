import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {logout} from '../store'
import AccountMenu from './accountMenu'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import SearchBar from './navbarSearch'
import {updateBar} from '../store/searchBar'
import {avatarLogic, cartItemReducer} from './utility'

const Navbar = ({
  cart,
  user,
  handleClick,
  isLoggedIn,
  isAdmin,
  updateSearch,
}) => {
  return (
    <div>
      <nav>
        <div className="left-nav">
          <AccountMenu
            isLoggedIn={isLoggedIn}
            isAdmin={isAdmin}
            handleLogout={handleClick}
          />

          <NavLink to="/home">
            <img id="logo" src="/Logo.png" alt="logo" />
          </NavLink>
          <SearchBar />
          {
            isAdmin && (
              <Fragment>
                <NavLink to="/users">VIEW USERS</NavLink>
                <NavLink to="/additems">ADD AN ITEM</NavLink>
                <NavLink to="/updateitems">UPDATE/REMOVE ITEM</NavLink>
              </Fragment>
            ) /* : (
            ''
          ) */
          }
        </div>
        <div className="right-nav">
          <NavLink to="/items" onClick={() => updateSearch('')}>
            All
          </NavLink>
          <NavLink to="/basketball/items" onClick={() => updateSearch('')}>
            Basketball
          </NavLink>
          <NavLink to="/football/items" onClick={() => updateSearch('')}>
            Football
          </NavLink>
          <NavLink to="/soccer/items" onClick={() => updateSearch('')}>
            Soccer
          </NavLink>
          <NavLink to="/baseball/items" onClick={() => updateSearch('')}>
            Baseball
          </NavLink>
          <NavLink to="/eSports/items" onClick={() => updateSearch('')}>
            eSports
          </NavLink>
          <NavLink to="/home">{avatarLogic(user)}</NavLink>
          <NavLink to="/cart" onClick={() => updateSearch('')}>
            <ShoppingCartIcon id="shopping-cart-img" fontSize="large" />
            <span id="oval">{cart.reduce(cartItemReducer, 0)}</span>
          </NavLink>
        </div>
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */

const mapState = (state) => {
  return {
    cart: state.cart,
    user: state.user,
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout())
    },
    updateSearch: (value) => dispatch(updateBar(value)),
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
