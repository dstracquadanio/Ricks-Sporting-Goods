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
