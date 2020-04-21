import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import itemsReducer from './items'
import selectedItemReducer from './selectedItem'
import userReducer from './user'
import shoppingCartReducer from './shoppingCart'

const reducer = combineReducers({
  items: itemsReducer,
  selectedItem: selectedItemReducer,
  user: userReducer,
  shoppingCart: shoppingCartReducer,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'

// after reducer is combined:
// reducer: {
//   items: [{}, {}, {},]
//   selectedItem: {},
//   user: {},
//   shoppingCart: [{}, {}, {}]
// }
