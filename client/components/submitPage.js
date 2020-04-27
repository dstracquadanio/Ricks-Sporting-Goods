import React, {Component} from 'react'
import {connect} from 'react-redux'
// import {checkoutThunk} from '../store/cart'
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircle'

class DisconnectedSubmitPage extends Component {
  componentDidMount() {
    // console.log('hi')
  }

  render() {
    return (
      <div className="container-12">
        <CheckCircleTwoToneIcon id="order-placed-icon" />
        <div>Thank you for your purchase!</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.cart,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    // checkout: (obj) => dispatch(checkoutThunk(obj)),
  }
}

const SubmitPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedSubmitPage)

export default SubmitPage
