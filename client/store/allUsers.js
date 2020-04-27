import axios from 'axios'

const GOT_ALL_USERS = 'GOT_ALL_USERS'
const UPDATE_USER = 'UPDATE_USER'

// GET ALL USERS
export const gotAllUsers = (allUsers) => ({
  type: GOT_ALL_USERS,
  allUsers,
})

export const getAllUsers = () => async (dispatch) => {
  const {data} = await axios.get('/api/users')
  dispatch(gotAllUsers(data))
}

const defaultUsers = []
export default function allUsersReducer(state = defaultUsers, action) {
  switch (action.type) {
    case GOT_ALL_USERS:
      return action.allUsers
    case UPDATE_USER:
      return state.map((user) => {
        if (user.id === action.updatedUser.id) {
          return action.updatedUser
        }
        return user
      })
    default:
      return state
  }
}
