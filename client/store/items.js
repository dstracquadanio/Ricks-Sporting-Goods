/* eslint-disable no-case-declarations */
import axios from 'axios'

//ACTION TYPES
const GOT_ITEMS = 'GOT_ITEMS'
const CHECKOUT = 'CHECKOUT'
const DELETE_ITEM = 'DELETE_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'
const POSTED_ITEM = 'POSTED_ITEM'

//ACTION TYPES
export const gotItems = (items) => ({
  type: GOT_ITEMS,
  items,
})

const postedItem = (newItem) => ({
  type: POSTED_ITEM,
  newItem,
})

const removeItem = (id) => ({
  type: DELETE_ITEM,
  id,
})

const updateItem = (updatedItem) => ({
  type: UPDATE_ITEM,
  updatedItem,
})

//THUNKS
export const getItems = () => async (dispatch) => {
  const {data} = await axios.get('/api/items')
  dispatch(gotItems(data))
}

export const postItem = (newItem) => async (dispatch) => {
  const {data} = await axios.post('/api/items', newItem)
  dispatch(postedItem(data))
}

export const removeSingleItem = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/items/${id}`)
    dispatch(removeItem(id))
  }
}

export const updateSingleItem = (updatedItem) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/items/${updatedItem.id}`, updatedItem)
      dispatch(updateItem(res.data))
    } catch (error) {
      console.log('error')
    }
  }
}

const defaultItems = []
export default function itemsReducer(state = defaultItems, action) {
  switch (action.type) {
    case GOT_ITEMS:
      return action.items
    case CHECKOUT:
      const cart = {}
      action.cartItems.forEach((item) => {
        cart[item.itemId] = item.quantity
      })
      return state.map((item) => {
        if (cart[item.id]) {
          return {
            ...item,
            quantity: item.quantity - cart[item.id],
          }
        } else {
          return item
        }
      })
    case DELETE_ITEM:
      return state.filter((item) => item.id !== action.data)
    case UPDATE_ITEM:
      const newItemList = state.filter(
        (item) => item.id !== action.updatedItem.id
      )
      return [...newItemList, action.updatedItem] //i think we can just map here instead
    case POSTED_ITEM:
      return [...state, action.newItem]
    default:
      return state
  }
}
