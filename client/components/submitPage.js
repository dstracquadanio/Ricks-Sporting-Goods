import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {checkoutThunk} from '../store/cart'
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircle'

class DisconnectedSubmitPage extends Component {
  render() {
    return (
      <div className="container-12">
        <CheckCircleTwoToneIcon id="order-placed-icon" />
        <div>Thank you for your purchase!</div>
        {this.props.orders && (
          <div id="submit-page-text">
            Your order number is{' '}
            {'0'.repeat(
              6 -
                this.props.orders[
                  this.props.orders.length - 1
                ].orderNumber.toString().length
            ) + this.props.orders[this.props.orders.length - 1].orderNumber}
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
    orders: state.user.orders,
  }
}

const SubmitPage = connect(mapStateToProps)(DisconnectedSubmitPage)

export default SubmitPage
