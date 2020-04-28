import axios from 'axios'

const UPDATE_CLIENT = 'UPDATE_CLIENT'

const updateClient = (client) => ({
  type: UPDATE_CLIENT,
  client,
})

export const getClientSecret = () => {
  return async (dispatch) => {
    try {
      //STRIPE STUFF
      const response = await axios.get('/secret')

      dispatch(updateClient(response.data.client_secret))
    } catch (error) {
      console.log('Error retrieving client secret: ', error)
    }
  }
}

export default function clientReducer(client = '', action) {
  switch (action.type) {
    case UPDATE_CLIENT:
      return action.client
    default:
      return client
  }
}
