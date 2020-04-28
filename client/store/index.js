import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import itemsReducer from './items'
import userReducer from './user'
import allUsersReducer from './allUsers'
import cartReducer from './cart'
import searchReducer from './searchBar'
import loadReducer from './loading'
import clientReducer from './client'

const reducer = combineReducers({
  items: itemsReducer,
  user: userReducer,
  allUsers: allUsersReducer,
  cart: cartReducer,
  searchBar: searchReducer,
  load: loadReducer,
  client: clientReducer,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)

// Save State to localStorage if page is refreshed
function saveStateToStorage(state) {
  try {
    let cart = state.cart
    state = {
      cart,
    }
    const stringState = JSON.stringify(state)
    localStorage.setItem('state', stringState)
  } catch (error) {
    console.log(error)
  }
}

function loadStateFromStorage() {
  try {
    const stringState = localStorage.getItem('state')
    if (stringState === null) return undefined
    return JSON.parse(stringState)
  } catch (error) {
    console.log(error)
    return undefined
  }
}

const savedState = loadStateFromStorage()

const store = createStore(reducer, savedState, middleware)

store.subscribe(() => saveStateToStorage(store.getState()))

export default store
export * from './user'

// after reducer is combined:
// reducer: {
//   items: [{}, {}, {},]
//   user: {},
//   cart: [{}, {}, {}]
// }
