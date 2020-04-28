import axios from 'axios'
import history from '../history'
import {getCartThunk} from './cart'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const UPDATE_USER = 'UPDATE_USER'
const GET_HISTORY = 'GET_HISTORY'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = (user) => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})
const updateProfile = (data) => ({type: UPDATE_USER, data})

/**
 * THUNK CREATORS
 */
export const me = () => async (dispatch) => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
    if (res.data.id) {
      dispatch(getCartThunk(res.data.id))
      dispatch(getHistoryThunk(res.data.id))
    }
  } catch (err) {
    console.error(err)
  }
}

export const auth = (email, password, method) => async (dispatch) => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {email, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    if (res.data.id) {
      dispatch(getCartThunk(res.data.id))
    }
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async (dispatch) => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

export const updateUserProfile = (id, changes) => {
  return async (dispatch) => {
    try {
      const res = await axios.put(`/api/users/profile/${id}`, changes)
      dispatch(updateProfile(res.data))
    } catch (error) {
      console.log('error')
    }
  }
}

const getHistory = (purchasedItems) => ({
  type: GET_HISTORY,
  purchasedItems,
})

export const getHistoryThunk = (userId) => {
  return async (dispatch) => {
    try {
      const {data} = await axios.get(`/api/users/${userId}/orders`)
      dispatch(getHistory(data))
    } catch (error) {
      console.log('getHistoryThunk Error', error)
    }
  }
}

/**
 * REDUCER
 */
export default function userReducer(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    case UPDATE_USER:
      return action.data
    case GET_HISTORY:
      return {
        ...state,
        orders: action.purchasedItems,
      }
    default:
      return state
  }
}
