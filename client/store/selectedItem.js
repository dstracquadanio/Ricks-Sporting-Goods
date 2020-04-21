/* eslint-disable default-case */
import axios from 'axios'

/**
 * ACTION TYPES
 */

const SET_ITEM = 'SET_ITEM'

/**
 * ACTION CREATORS
 */

const setItem = (data) => ({
  type: SET_ITEM,
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
    default:
      return state
  }
}
