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
      <Link to="/basketball/items">
        <img
          className="home-image"
          src="https://png.pngtree.com/element_pic/00/16/08/0557a3eb9e85e92.jpg"
          alt="basketball image"
        />
      </Link>
      <Link to="/baseball/items">
        <img
          className="home-image"
          src="https://banner2.cleanpng.com/20180216/tqw/kisspng-mlb-baseball-softball-sport-vector-realistic-baseball-5a876783b07926.5427980315188232997228.jpg"
          alt="baseball image"
        />
      </Link>
      <Link to="/football/items">
        <img
          className="home-image"
          src="https://a.espncdn.com/combiner/i?img=/redesign/assets/img/icons/ESPN-icon-football-college.png&w=288&h=288&transparent=true'"
          alt="football image"
        />
      </Link>
      <Link to="/eSports/items">
        <img
          className="home-image"
          src="https://images-na.ssl-images-amazon.com/images/I/61hzuoXwjqL._AC_SX466_.jpg"
          alt="mouse image"
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
