import axios from 'axios'

const GOT_ALL_USERS = 'GOT_ALL_USERS'

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
    default:
      return state
  }
}
