import React, {Component} from 'react'
import {connect} from 'react-redux'
import {removeSingleItem} from '../store/items'
import {Link} from 'react-router-dom'
// import axios from "axios"

const imageStyle = {
  width: '100px',
  height: '100px',
  padding: '5px',
}
const borderStyle = {
  borderWidth: '2px',
  borderColor: 'black',
  borderStyle: 'solid',
}

export class Itemlist extends Component {
  render() {
    const removeSingleItem = this.props.removeSingleItem

    const items = this.props.items
    return (
      <div id="item-list">
        {items.map((item) => (
          <div key={item.id} style={borderStyle}>
            <div id="single-item-container">
              <img src={item.imageUrl} style={imageStyle} />
              <div>
                <p>{item.name}</p>
                <p>{item.price}</p>
                <button type="button" onClick={() => removeSingleItem(item.id)}>
                  Remove
                </button>
                <Link to={`/updateitems/${item.id}`}>Update </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }
}

const mapState = (state) => ({
  items: state.items,
})

const mapDispatch = (dispatch) => ({
  removeSingleItem: (id) => dispatch(removeSingleItem(id)),
})

export default connect(mapState, mapDispatch)(Itemlist)
