import React, {Component} from 'react'
import {connect} from 'react-redux'

// const pStyle ={
//     textAlign: "left"
// }

export class Itemlist extends Component {
  render() {
    const items = this.props.items
    return (
      <div id="items">
        {items.map((item) => (
          <div key={item.id}>
            <h1> {item.name}</h1>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = (state) => ({
  items: state.items,
})

export default connect(mapState, null)(Itemlist)
