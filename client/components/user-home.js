import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  render() {
    return (
      <div>
        <h3>Welcome, {this.props.user.email}</h3>
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
