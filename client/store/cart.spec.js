/* global describe beforeEach afterEach it */

import {expect} from 'chai'
import {
  getCartThunk,
  checkoutThunk,
  updateCartThunk,
  editCartThunk,
  removeCartItemThunk,
} from './Cart'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Cart thunk creators', () => {
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

  describe('getCart Thunk', () => {
    it('eventually dispatches the GET_CART action', async () => {
      const fakeCart = [
        {
          name: 'basketball',
          price: 30.0,
          quantity: 2,
          sport: 'basketball',
          itemId: 1,
          userId: 2,
        },
      ]
      mockAxios
        .onGet(`/api/users/${fakeCart[0].userId}/cart`)
        .replyOnce(200, fakeCart)
      await store.dispatch(getCartThunk(2))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_CART')
      expect(actions[0].cartItems).to.be.deep.equal(fakeCart)
    })
  })

  describe('checkout Thunk', () => {
    it('checkout: eventually dispatches the CHECKOUT action', async () => {
      const fakeCheckoutObj = {
        user: {
          id: 2,
        },
        cart: {
          name: 'basketball',
          price: 30.0,
          quantity: 2,
          sport: 'basketball',
          itemId: 1,
          userId: 2,
        },
      }
      mockAxios
        .onDelete(`/api/users/${fakeCheckoutObj.user.id}/checkout`)
        .replyOnce(204)
      mockAxios.onPut('/api/items/checkout').replyOnce(204)
      await store.dispatch(checkoutThunk(fakeCheckoutObj))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('CHECKOUT')
      expect(actions[0].cartItems).to.be.deep.equal(fakeCheckoutObj.cart)
    })
  })

  describe('updateCart Thunk', () => {
    it('updateCart: eventually dispatches the UPDATE_CART action', async () => {
      const fakeItemObj = {
        user: {
          id: 2,
        },
        item: {
          name: 'basketball',
          price: 30.0,
          quantity: 2,
          sport: 'basketball',
          id: 1,
        },
      }
      const fakeCartItem = {
        name: 'basketball',
        price: 30.0,
        quantity: 2,
        sport: 'basketball',
        itemId: 1,
        userId: 2,
      }
      mockAxios.onPut(`/api/users/${fakeItemObj.user.id}`).replyOnce(204)
      await store.dispatch(updateCartThunk(fakeItemObj))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('UPDATE_CART')
      expect(actions[0].cartItem).to.be.deep.equal(fakeCartItem)
    })
  })

  describe('editCart Thunk', () => {
    it('editCart: eventually dispatches the UPDATE_CART action', async () => {
      const fakeObj = {
        user: {
          id: 2,
        },
        item: {
          name: 'basketball',
          price: 30.0,
          quantity: 2,
          sport: 'basketball',
          itemId: 1,
          userId: 2,
        },
      }
      mockAxios.onPut(`/api/users/${fakeObj.user.id}`).replyOnce(204)
      await store.dispatch(editCartThunk(fakeObj))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('UPDATE_CART')
      expect(actions[0].cartItem).to.be.deep.equal(fakeObj.item)
    })
  })

  describe('removeCartItem Thunk', () => {
    it('eventually dispatches the removeCartItem action', async () => {
      const userId = 2
      const itemId = 1
      mockAxios.onDelete(`/api/users/${userId}/cart/${itemId}`).replyOnce(204)
      await store.dispatch(removeCartItemThunk(userId, itemId))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_CART_ITEM')
      expect(actions[0].itemId).to.be.deep.equal(itemId)
    })
  })
})
