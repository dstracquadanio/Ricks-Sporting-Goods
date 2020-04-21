import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItems} from '../store/items'

export class AllItems extends Component {
  componentDidMount() {
    this.props.getItems()
  }

  render() {
    let {items} = this.props
    items = this.viewFilter(items)
    return (
      <div id="items">
        {items.map((item) => {
          return (
            <div key={item.id} className="singleItem">
              <h2>{item.name}</h2>
              <h3>Price: {item.price}</h3>
              <h3>Quantity: {item.quantity}</h3>
              <img src={item.imageUrl} />
              {item.description ? <p>{item.description}</p> : ''}
            </div>
          )
        })}
      </div>
    )
  }

  viewFilter(items) {
    let singleSport = []
    items.map((item) => {
      if (this.props.location.pathname === `/items/${item.sport}`) {
        singleSport.push(item)
      }
    })
    return !singleSport.length ? items : singleSport
  }
}

const mapStateToProps = (state) => ({
  items: state.items,
})

const mapDispatchToProps = (dispatch) => ({
  getItems: () => dispatch(getItems()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
