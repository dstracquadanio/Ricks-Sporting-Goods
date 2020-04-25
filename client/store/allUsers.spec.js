/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getAllUsers} from './allUsers'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('User thunk creators', () => {
  let store
  let mockAxios

  const initialState = {user: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getAllUsers', () => {
    it('eventually dispatches the gotAllUsers', async () => {
      const fakeUser = {email: 'Cody'}
      mockAxios.onGet('/api/users').replyOnce(200, fakeUser)
      await store.dispatch(getAllUsers())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ALL_USERS')
      expect(actions[0].allUsers).to.be.deep.equal(fakeUser)
    })
  })
})
