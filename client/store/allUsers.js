import axios from 'axios'

const GOT_ALL_USERS = 'GOT_ALL_USERS'
const ADMIN_UPDATE_USER = 'ADMIN_UPDATE_USER'
const DELETED_USER = 'DELETED_USER'

// GET ALL USERS
export const gotAllUsers = (allUsers) => ({
  type: GOT_ALL_USERS,
  allUsers,
})

const adminUpdatedUser = (updatedUser) => ({
  type: ADMIN_UPDATE_USER,
  updatedUser,
})

const deletedUser = (userId) => ({
  type: DELETED_USER,
  userId,
})

//THUNKS
export const adminUpdateUser = (updatedUser) => {
  return async (dispatch) => {
    try {
      const changedUserRes = await axios.put(
        `/api/users/profile/${updatedUser.id}`,
        updatedUser
      )
      dispatch(adminUpdatedUser(changedUserRes.data))
    } catch (error) {
      console.log('ERROR AT ADMIN UPDATING USER')
    }
  }
}

export const getAllUsers = () => async (dispatch) => {
  const {data} = await axios.get('/api/users')
  dispatch(gotAllUsers(data))
}

export const deleteUser = (userId) => async (dispatch) => {
  await axios.delete(`/api/users/${userId}`)
  dispatch(deletedUser(userId))
}

const defaultUsers = []
export default function allUsersReducer(state = defaultUsers, action) {
  switch (action.type) {
    case GOT_ALL_USERS:
      return action.allUsers
    case ADMIN_UPDATE_USER:
      return state.map((user) => {
        if (user.id === action.updatedUser.id) {
          return action.updatedUser
        }
        return user
      })
    case DELETED_USER:
      return state.filter((user) => user.id !== action.userId)
    default:
      return state
  }
}
