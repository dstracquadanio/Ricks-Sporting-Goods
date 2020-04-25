const UPDATE_BAR = 'UPDATE_BAR'

export const updateBar = (value) => ({
  type: UPDATE_BAR,
  value,
})

const defaultSearch = ''
export default function searchReducer(state = defaultSearch, action) {
  switch (action.type) {
    case UPDATE_BAR:
      return action.value
    default:
      return state
  }
}
