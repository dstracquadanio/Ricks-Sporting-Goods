import Avatar from '@material-ui/core/Avatar'
import React from 'react'

export const checkInventoryItemToItems = (
  item,
  allItems,
  cart,
  quantityToAdd
) => {
  let totalAmtInventory = allItems.filter((eachItem) => {
    return eachItem.id === item.id
  })[0].quantity
  let cartItem = cart.filter((eachItem) => {
    return eachItem.itemId === item.id
  })[0]
  let totalCartInventory = cartItem ? cartItem.quantity : 0

  // if there isn't enough in inventory, return the item id that has the issue
  if (totalAmtInventory - totalCartInventory < quantityToAdd) {
    return item.id
  } else {
    return false
  }
}

export const checkInventoryCartItemToItems = (
  cartItem,
  allItems,
  cart,
  quantityToAdd
) => {
  let totalAmtInventory = allItems.filter((eachItem) => {
    return eachItem.id === cartItem.itemId
  })[0].quantity
  let totalCartInventory = cartItem.quantity

  // if there isn't enough in inventory, return the cartItem id that has the issue
  if (totalAmtInventory - totalCartInventory < quantityToAdd) {
    return cartItem.itemId
  } else {
    return false
  }
}

export const attachQuantityToItem = (item, cart, quantityToAdd) => {
  let itemToSend = {...item}
  let itemInCart = cart.filter(
    (cartItem) => cartItem.itemId === itemToSend.id
  )[0]

  if (itemInCart) {
    itemToSend.quantity = itemInCart.quantity + quantityToAdd
  } else {
    itemToSend.quantity = quantityToAdd
  }

  return itemToSend
}

export const attachQuantityToCartItem = (item, cart, quantityToAdd) => {
  let itemToChange = {...item}
  let itemInCart = cart.filter(
    (cartItem) => cartItem.itemId === itemToChange.itemId
  )[0]

  itemToChange.quantity = itemInCart.quantity + quantityToAdd
  return itemToChange
}

//RENDERING AVATAR IN NAVBAR
export const avatarLogic = (user) => {
  if (user.firstName && user.lastName) {
    const initials = `${user.firstName[0].toUpperCase()}${user.lastName[0].toUpperCase()}`
    return <Avatar>{initials}</Avatar>
  }
  if (user.firstName) {
    return <Avatar>{`${user.firstName[0].toUpperCase()}`}</Avatar>
  }
  if (user.email) {
    return <Avatar>{`${user.email[0].toUpperCase()}`}</Avatar>
  } else {
    return <Avatar />
  }
}

//Cart items counter
export const cartItemReducer = (accum, current) => {
  return accum + current.quantity
}

export const binarySearch = (arr, targetId) => {
  if (arr.length === 0) return {}
  let left = 0
  let right = arr.length - 1
  while (left <= right) {
    let midElementIdx = Math.floor((left + right) / 2)
    let id = arr[midElementIdx].id

    if (id < targetId) {
      left = midElementIdx + 1
    } else if (id > targetId) {
      right = midElementIdx - 1
    } else {
      return arr[midElementIdx]
    }
  }
  return null
}
