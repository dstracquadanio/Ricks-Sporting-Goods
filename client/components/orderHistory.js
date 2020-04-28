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
                  <div>
                    <div>Order Placed</div>
                    <div>{orderGroup.group[0].createdAt}</div>
                  </div>
                  <div>
                    <div>Total</div>
                    <div>
                      $
                      {orderGroup.group.reduce((accum, current) => {
                        return accum + Number(current.price)
                      }, 0)}
                    </div>
                  </div>
                  <div>
                    <div>Shipped To</div>
                    <div>{this.props.name && <div>{this.props.name}</div>}</div>
                  </div>
                </div>
                <div>Order #: 00000</div>
              </div>
              {orderGroup.group.map((item) => {
                return (
                  <div key={item.id} className="order-info">
                    <div>Order Id{item.orderNumber}</div>
                    <div>
                      Total Price: ${Number(item.price) * Number(item.quantity)}
                    </div>
                    <div>Name: {item.name}</div>
                    <div>Quantity: {item.quantity}</div>
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
