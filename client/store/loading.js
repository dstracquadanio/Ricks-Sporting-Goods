const GOT_ITEMS = 'GOT_ITEMS'

const defaultLoad = true
export default function loadingReducer(state = defaultLoad, action) {
  switch (action.type) {
    case GOT_ITEMS:
      return false
    default:
      return state
  }
}
