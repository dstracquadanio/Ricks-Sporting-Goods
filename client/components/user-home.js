import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import HomeCarousel from './homeCarousel'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  // const {email} = props.user
  return (
    <div>
      <div className="container-center-column ricks-color">
        <img src="Logo.png" alt="banner" />
      </div>
      {/* <h3>Welcome, {email}</h3> */}
      <HomeCarousel />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
