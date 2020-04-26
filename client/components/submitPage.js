import React, {Component} from 'react'
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircle'

class submitPage extends Component {
  constructor() {
    super()
  }
  componentDidMount() {
    console.log('hi')
  }

  render() {
    console.log('hi2')
    return (
      <div className="container-12">
        <CheckCircleTwoToneIcon id="order-placed-icon" />
        <div>Thank you for your purchase!</div>
      </div>
    )
  }
}

export default submitPage
