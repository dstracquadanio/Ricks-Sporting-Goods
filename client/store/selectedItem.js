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
  const {data} = await axios.get(`/api/items/${id}`)
  dispatch(setItem(data))
}

/**
 * REDUCER
 */
const defaultSelectedItem = {
  selectedItem: {},
}
export default function (state = defaultSelectedItem, action) {
  switch (action.type) {
    case SET_ITEM:
      return {...state, selectedItem: action.data}

    default:
      return state
  }
}
