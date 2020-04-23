import React, {Component} from 'react'
// import axios from "axios";
// import Itemform from "./itemForm";
import {connect} from 'react-redux'

class UpdateItems extends Component {
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
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    const itemsId = this.props.match.params.todoId
    await axios.get(`/api/items/${itemsId}`)

    this.setState({
      name: res.data.items.name || '',
      price: res.data.items.address || '',
      description: res.data.items.description || '',
      imageUrl: res.data.items.imageUrl || '',
      quantity: res.data.items.quantity || '',
      sport: res.data.items.sport || '',
    })
  }
}

// handleChange(evt) {
//     this.setState({
//         [evt.target.name]: evt.target.value,
//     });
// }

// async handleSubmit(evt) {
//     evt.preventDefault();
//     const itemId = this.props.items.id;
//     await axios.put(`/api/items/${itemId}`, this.state)
//     this.setState({
//         name: '',
//         price: '',
//         description: '',
//         imageUrl: '',
//         quantity: '',
//         sport: '',
//     })
// }

// render() {
//     const items = this.props.items
//     let itemId = this.props.match.params.id

//     return (

//         <div>
//             {items.map((item) => {
//                 if (String(item.id) === itemId) {
//                     return (
//                         <div key={item.id}>
//                             <h3>Item: {item.name}</h3>
//                             <h3>Description: {item.description}</h3>
//                             <h3>Price: ${item.price}</h3>
//                             <h3>Quantity: {item.quantity}</h3>
//                         </div>
//                     )
//                 }
//                 return null
//             })}
//         </div>
// <Itemform
//     {...this.state}
//     handleChange={this.handleChange}
//     handleSubmit={this.handleSubmit}
// />
//         );
//     }
// }

// const mapState = (state) => ({
//     items: state.items,
// })

// export default connect(mapState, null)(UpdateItems)
