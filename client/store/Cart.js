/* eslint-disable no-case-declarations */
import axios from 'axios'

// Action Types:
const GET_CART = 'GET_CART'
const UPDATE_CART = 'UPDATE_CART'
const CHECKOUT = 'CHECKOUT'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_CLIENT = 'UPDATE_CLIENT'

// Action Creators / Thunks
const getCart = (cartItems) => ({
  type: GET_CART,
  cartItems,
})

export const getCartThunk = (userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/cart`)
      dispatch(getCart(data))
    } catch (error) {
      console.log('GetCart Thunk Error: ', error)
    }
  }
}

export const updateCart = (cartItem) => {
  return {
    type: UPDATE_CART,
    cartItem,
  }
}

export const updateCartThunk = (obj) => {
  //expects obj with user and item
  return async (dispatch) => {
    try {
      let cartItem = obj.item
      cartItem.userId = obj.user.id
      cartItem.itemId = cartItem.id
      delete cartItem.id

      if (obj.user.id) {
        await axios.put(`/api/users/${obj.user.id}`, cartItem)
      }
      dispatch(updateCart(cartItem))
    } catch (error) {
      console.log('updateCartThunk Error: ', error)
    }
  }
}

export const editCartThunk = (obj) => {
  return async (dispatch) => {
    try {
      if (obj.user.id) {
        await axios.put(`/api/users/${obj.user.id}`, obj.item)
      }
      dispatch(updateCart(obj.item))
    } catch (error) {
      console.log('EditCart Thunk Error: ', error)
    }
  }
}

const checkout = (cartItems) => ({
  type: CHECKOUT,
  cartItems,
})

export const checkoutThunk = (checkoutObj) => {
  return async (dispatch) => {
    try {
      if (checkoutObj.user.id) {
        await axios.delete(`/api/users/${checkoutObj.user.id}/checkout`)
      }
      await axios.put('/api/items/checkout', checkoutObj.cart)
      await dispatch(checkout(checkoutObj.cart))
    } catch (error) {
      console.log('Checkout Thunk Error:', error)
    }
  }
}

const removeCartItem = (itemId) => ({
  type: REMOVE_CART_ITEM,
  itemId,
})

export const removeCartItemThunk = (userId, itemId) => async (dispatch) => {
  try {
    if (userId) {
      await axios.delete(`/api/users/${userId}/cart/${itemId}`)
      dispatch(removeCartItem(itemId))
    } else dispatch(removeCartItem(itemId))
  } catch (error) {
    console.log('Remove Item Thunk Error:', error)
  }
}

// Initial State
const defaultShoppingCart = []

/**
 * REDUCER
 */
export default function cartReducer(state = defaultShoppingCart, action) {
  switch (action.type) {
    case GET_CART:
      return action.cartItems
    case REMOVE_CART_ITEM:
      return state.filter((items) => items.itemId !== action.itemId)
    case UPDATE_CART:
      let updatedCart
      if (
        state.filter((item) => {
          return item.itemId === action.cartItem.itemId
        }).length
      ) {
        updatedCart = state.map((item) => {
          if (item.itemId === action.cartItem.itemId) {
            return {
              ...item,
              quantity: action.cartItem.quantity,
            }
          } else {
            return item
          }
        })
      } else {
        updatedCart = [...state, action.cartItem]
      }
      return updatedCart
    case CHECKOUT:
      return []
    case REMOVE_USER:
      return defaultShoppingCart
    default:
      return state
  }
}
