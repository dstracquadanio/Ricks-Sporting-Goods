import React, {Component} from 'react'
import axios from 'axios'
import Itemform from './itemForm'

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
      <Itemform
        {...this.state}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    )
  }
}
