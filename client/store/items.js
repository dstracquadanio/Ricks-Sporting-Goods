import axios from 'axios'

const GOT_ITEMS = 'GOT_ITEMS'
const CHECKOUT = 'CHECKOUT'
const DELETE_ITEM = 'DELETE_ITEM'

// GET ALL ITEMS
export const gotItems = (items) => ({
  type: GOT_ITEMS,
  items,
})

const removeItem = (data) => ({
  type: DELETE_ITEM,
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

const defaultItems = []
export default function itemsReducer(state = defaultItems, action) {
  switch (action.type) {
    case GOT_ITEMS:
      return action.items
    case CHECKOUT:
      return action.items
    case DELETE_ITEM:
      return state.filter((item) => item.id !== action.data)
    default:
      return state
  }
}
