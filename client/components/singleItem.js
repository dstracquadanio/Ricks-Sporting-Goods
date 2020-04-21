import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleItem} from '../store/selectedItem'

export class SingleItem extends React.Component {
  componentDidMount() {
    const itemId = this.props.match.params.itemId
    this.props.fetchSingleItem(+itemId)
  }

  render() {
    const selectedItem = this.props.selectedItem
    console.log(this.props)
    return (
      <div>
        <h3>Item: {selectedItem.name}</h3>
        <h3>Price: {selectedItem.price}</h3>
        <img src={selectedItem.imageUrl} />
        <h3>Quantity: {selectedItem.quantity}</h3>
      </div>
    )
  }
}

const mapState = (state) => ({
  selectedItem: state.selectedItem,
})

const mapDispatch = (dispatch) => ({
  fetchSingleItem: (id) => dispatch(fetchSingleItem(id)),
})

export default connect(mapState, mapDispatch)(SingleItem)
