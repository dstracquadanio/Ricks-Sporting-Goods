/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {getItems, removeSingleItem} from './items'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Items thunk creators', () => {
  let store
  let mockAxios

  const initialState = {cart: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getItems', () => {
    it('eventually dispatches the GOT_ITEMS action', async () => {
      const fakeItems = [
        {
          name: 'Basketball Hoop',
          price: 10.0,
          quantity: 9,
          sport: 'basketball',
        },
        {
          name: 'Football Helmet',
          price: 30.0,
          quantity: 5,
          sport: 'football',
        },
      ]
      mockAxios.onGet('/api/items').replyOnce(200, fakeItems)
      await store.dispatch(getItems())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_ITEMS')
      expect(actions[0].items).to.be.deep.equal(fakeItems)
    })
  })

  describe('removeSingleItem Thunk', () => {
    it('eventually dispatches the DELETE_ITEM action', async () => {
      const userId = 2
      mockAxios.onDelete(`/api/items/${userId}`).replyOnce(204)
      await store.dispatch(removeSingleItem(userId))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('DELETE_ITEM')
      expect(actions[0].data).to.be.deep.equal(userId)
    })
  })
})
