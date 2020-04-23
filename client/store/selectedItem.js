/* eslint-disable default-case */
import axios from 'axios'

/**
 * ACTION TYPES
 */

const SET_ITEM = 'SET_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'

/**
 * ACTION CREATORS
 */

const setItem = (data) => ({
  type: SET_ITEM,
  data,
})

const removeItem = (data) => ({
  type: DELETE_ITEM,
  data,
})

/**
 * THUNK CREATORS
 */
export const fetchSingleItem = (id) => async (dispatch) => {
  try {
    const {data} = await axios.get(`/api/items/${id}`)
    dispatch(setItem(data))
  } catch (error) {
    console.log('there is an error', error)
  }
}

export const removeSingleItem = (id) => {
  return async (dispatch) => {
    await axios.delete(`/api/items/${id}`)
    dispatch(removeItem(id))
  }
}

/**
 * REDUCER
 */
const defaultSelectedItem = {}
export default function selectedItemReducer(
  state = defaultSelectedItem,
  action
) {
  switch (action.type) {
    case SET_ITEM:
      return action.data
    case DELETE_ITEM:
      return state.filter((item) => item.id !== action.data)
    default:
      return state
  }
}
