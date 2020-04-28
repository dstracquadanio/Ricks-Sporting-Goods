import React, {Component} from 'react'
import {connect} from 'react-redux'

class DisconnectedOrderHistory extends Component {
  render() {
    const orders = this.props.orders || []

    let groupedOrders = [] // [ id: 1, group: [ { }, { }], id: 2, group: [{ }, { }]]
    let group = [] // [{ orderNumber: 3}, { orderNumber:3}]
    let id = 1

    if (orders.length) {
      for (let i = 0; i < orders.length; i++) {
        if (i === 0) {
          group.push(orders[i])
        } else if (orders[i].orderNumber === orders[i - 1].orderNumber) {
          group.push(orders[i])
        } else {
          // if current orderNum !== previous orderNum
          groupedOrders.push({id: id, group: group})
          id++
          group = [orders[i]]
        }
      }
      groupedOrders.push({id: id, group: group})
    }

    return (
      // [[ { }, { }], [{ }, { }]]
      <div>
        {groupedOrders.map((orderGroup) => {
          return (
            <div key={orderGroup.id}>
              <div>Order ID {orderGroup.group[0].createdAt}</div>
              {orderGroup.group.map((item) => {
                return (
                  <div key={item.id}>
                    Order Id{item.orderNumber}
                    <div>Name: {item.name}</div>
                    <div>Quantity: {item.quantity}</div>
                    <div>
                      Total Price: ${Number(item.price) * Number(item.quantity)}
                    </div>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.user.orders,
  }
}
const OrderHistory = connect(mapStateToProps)(DisconnectedOrderHistory)
export default OrderHistory
