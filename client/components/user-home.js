import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <Link /* to={basketball route here} */>
        <img
          className="home-image"
          src="https://png.pngtree.com/element_pic/00/16/08/0557a3eb9e85e92.jpg"
          alt="basketball image"
        />
      </Link>
      <Link /* to={baseball route here} */>
        <img
          className="home-image"
          src="https://banner2.cleanpng.com/20180216/tqw/kisspng-mlb-baseball-softball-sport-vector-realistic-baseball-5a876783b07926.5427980315188232997228.jpg"
          alt="baseball image"
        />
      </Link>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
