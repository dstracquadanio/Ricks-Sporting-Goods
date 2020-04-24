import React from 'react'

const Itemform = (props) => (
  <form onSubmit={props.handleSubmit}>
    <label htmlFor="name"> Name: </label>
    <input
      name="name"
      type="text"
      onChange={props.handleChange}
      value={props.name}
    />

    <label htmlFor="price"> Price: </label>
    <input
      name="price"
      type="number"
      onChange={props.handleChange}
      value={props.price}
    />
    <label htmlFor="description"> Description: </label>
    <input
      name="description"
      type="text"
      onChange={props.handleChange}
      value={props.description}
    />
    <label htmlFor="imageUrl"> ImageUrl: </label>
    <input
      name="imageUrl"
      type="text"
      onChange={props.handleChange}
      value={props.imageUrl}
    />
    <label htmlFor="quantity"> Quantity: </label>
    <input
      name="quantity"
      type="number"
      onChange={props.handleChange}
      value={props.quantity}
    />
    <label htmlFor="sport"> Sport: </label>
    <input
      name="sport"
      type="text"
      onChange={props.handleChange}
      value={props.sport}
    />

    <button type="submit"> Submit </button>
  </form>
)

export default Itemform
