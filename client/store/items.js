/* eslint-disable no-case-declarations */
import axios from 'axios'

const GOT_ITEMS = 'GOT_ITEMS'
const CHECKOUT = 'CHECKOUT'
const DELETE_ITEM = 'DELETE_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'

// GET ALL ITEMS
export const gotItems = (items) => ({
  type: GOT_ITEMS,
  items,
})

const removeItem = (data) => ({
  type: DELETE_ITEM,
  data,
})

const updateItem = (data) => ({
  type: UPDATE_ITEM,
  data,
})

export const getItems = () => async (dispatch) => {
  const {data} = await axios.get('/api/items')
  dispatch(gotItems(data))
}

export const removeSingleItem = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/items/${id}`)
    dispatch(removeItem(id))
  }
}

export const updateSingleItem = (id, changes) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/items/${id}`, changes)
      console.log('this is updated single', res.data)
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
      return action.items //HERE simulate backend model change
    case DELETE_ITEM:
      return state.filter((item) => item.id !== action.data)
    case UPDATE_ITEM:
      const newItemList = state.filter((item) => item.id !== action.data.id)
      return [...newItemList, action.data]
    default:
      return state
  }
}
