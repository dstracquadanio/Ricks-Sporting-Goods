import axios from 'axios'

// Action Types:
const CHECKOUT = 'CHECKOUT'

// Action Creators / Thunks
const checkout = (items) => ({
  type: CHECKOUT,
  items,
})
export const checkoutThunk = (checkoutObj) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.put()
    } catch (error) {
      console.log('Checkout Thunk Error:', error)
    }
  }
}

// Initial State
const defaultShoppingCart = []

/**
 * REDUCER
 */
export default function (state = defaultShoppingCart, action) {
  switch (action.type) {
    default:
      return state
  }
}
