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
      <div className="container-1-orders">
        <div id="order-title">Your Orders</div>
        {groupedOrders.map((orderGroup) => {
          return (
            <div key={orderGroup.id} className="container-2-orders">
              <div className="order-header">
                <div className="order-header2">
                  <div className="order-header3">
                    <div className="order-header4">Order Placed</div>
                    <div className="order-header5">
                      {orderGroup.group[0].createdAt.slice(5, 8) +
                        orderGroup.group[0].createdAt.slice(8, 10) +
                        '-' +
                        orderGroup.group[0].createdAt.slice(0, 4)}
                    </div>
                  </div>
                  <div className="order-header3">
                    <div className="order-header4">Total</div>
                    <div className="order-header5">
                      $
                      {orderGroup.group
                        .reduce((accum, current) => {
                          return accum + Number(current.price)
                        }, 0)
                        .toFixed(2)}
                    </div>
                  </div>
                  <div className="order-header3">
                    <div className="order-header4">Shipped To</div>
                    <div className="order-header5">
                      {this.props.name && <div>{this.props.name}</div>}
                    </div>
                  </div>
                </div>
                {console.log(orderGroup)}
                <div className="order-header3a">
                  <div className="order-header4">Order #</div>
                  <div className="order-header5">
                    {'0'.repeat(
                      6 - orderGroup.group[0].orderNumber.toString().length
                    ) + orderGroup.group[0].orderNumber}
                  </div>
                </div>
              </div>
              {orderGroup.group.map((item) => {
                return (
                  <div key={item.id} className="order-info">
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
    name: state.user.firstName + ' ' + state.user.lastName,
  }
}
const OrderHistory = connect(mapStateToProps)(DisconnectedOrderHistory)
export default OrderHistory
