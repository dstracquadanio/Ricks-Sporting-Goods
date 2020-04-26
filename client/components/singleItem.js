import React from 'react'
import {connect} from 'react-redux'
import {binarySearch} from './utility'

export class SingleItem extends React.Component {
  render() {
    // const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    // console.log(binarySearch(arr, 5))
    const items = this.props.items
    let itemId = this.props.match.params.id
    // console.log()
    const item = binarySearch(items, +itemId)
    return <div>{item.name}</div>
  }
}

const mapState = (state) => ({
  items: state.items,
})

export default connect(mapState, null)(SingleItem)

//DARREN's stuff
// <div>
// {items.map((item) => {
//   if (String(item.id) === itemId) {
//       return (
//         <div key={item.id}>
//           <h3>Item: {item.name}</h3>
//           <img  src={item.imageUrl} />
//           <h3>Description: {item.description}</h3>
//           <h3>Price: ${item.price}</h3>
//           <h3>Quantity: {item.quantity}</h3>
//         </div>
//       )
//     }
//     return null
//   })}
// </div>

// const pStyle = {
//   width: '400px',
//   height: '400px',
//   border: '1px solid #ddd',
//   borderRadius: '4px',
//   padding: '5px',
// }
