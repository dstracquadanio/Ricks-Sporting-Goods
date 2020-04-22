import React from 'react'
import {connect} from 'react-redux'

const pStyle = {
  width: '400px',
  height: '400px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '5px',
}

export class SingleItem extends React.Component {
  render() {
    const items = this.props.items
    let itemId = this.props.match.params.id
    return (
      <div>
        {items.map((item) => {
          if (String(item.id) === itemId) {
            return (
              <div key={item.id}>
                <h3>Item: {item.name}</h3>
                <img style={pStyle} src={item.imageUrl} />
                <h3>Description: {item.description}</h3>
                <h3>Price: ${item.price}</h3>
                <h3>Quantity: {item.quantity}</h3>
              </div>
            )
          }
          return null
        })}
      </div>
    )
  }
}

const mapState = (state) => ({
  items: state.items,
})

export default connect(mapState, null)(SingleItem)
