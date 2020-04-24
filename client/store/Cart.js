import axios from 'axios'

// Action Types:
const GET_CART = 'GET_CART'
const CHECKOUT = 'CHECKOUT'
const REMOVE_CART_ITEM = 'REMOVE_CART_ITEM'

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

const checkout = (items) => ({
  type: CHECKOUT,
  items,
})

export const checkoutThunk = (checkoutObj) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/users/${checkoutObj.userId}/checkout`)
      const {data} = await axios.put('/api/items/checkout', checkoutObj.cart)
      dispatch(checkout(data))
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
    await axios.delete(`/api/users/${userId}/cart/${itemId}`)
    dispatch(removeCartItem(itemId))
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
    case CHECKOUT:
      return []
    default:
      return state
  }
}
