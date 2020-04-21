import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getItems} from '../store/items'

export class AllItems extends Component {
  componentDidMount() {
    this.props.getItems()
  }

  render() {
    console.log(this.props)
    const items = this.viewFilter()
    return (
      <div>
        {items.map((item) => {
          return (
            <div key={item.id}>
              <h2>{item.name}</h2>
              <h3>Price: {item.price}</h3>
              <h3>Quantity: {item.quantity}</h3>
              <img src={item.imageUrl} />
              {item.descripton ? <p>{item.description}</p> : ''}
            </div>
          )
        })}
      </div>
    )
  }

  viewFilter() {
    if (this.props.match.path === `/items/:sport`) {
      return this.props.items.filter(
        (item) => item.name === this.props.match.params.sport
      )
    } else return this.props.items
  }
}

const mapStateToProps = (state) => ({
  items: state.items,
})

const mapDispatchToProps = (dispatch) => ({
  getItems: () => dispatch(getItems()),
})

export default connect(mapStateToProps, mapDispatchToProps)(AllItems)
