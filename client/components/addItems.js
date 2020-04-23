import React, {Component} from 'react'
import axios from 'axios'

export default class addItems extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      quantity: '',
      sport: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  async handleSubmit() {
    event.preventDefault()
    await axios.post('/api/items', this.state)
    this.setState({
      name: '',
      price: '',
      description: '',
      imageUrl: '',
      quantity: '',
      sport: '',
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name"> Name: </label>
        <input
          name="name"
          type="text"
          onChange={this.handleChange}
          value={this.state.name}
        />

        <label htmlFor="price"> Price: </label>
        <input
          name="price"
          type="number"
          onChange={this.handleChange}
          value={this.state.price}
        />
        <label htmlFor="description"> Description: </label>
        <input
          name="description"
          type="text"
          onChange={this.handleChange}
          value={this.state.description}
        />
        <label htmlFor="imageUrl"> ImageUrl: </label>
        <input
          name="imageUrl"
          type="text"
          onChange={this.handleChange}
          value={this.state.imageUrl}
        />
        <label htmlFor="quantity"> Quantity: </label>
        <input
          name="quantity"
          type="number"
          onChange={this.handleChange}
          value={this.state.quantity}
        />
        <label htmlFor="sport"> Sport: </label>
        <input
          name="sport"
          type="text"
          onChange={this.handleChange}
          value={this.state.sport}
        />

        <button type="submit"> Submit </button>
      </form>
    )
  }
}
