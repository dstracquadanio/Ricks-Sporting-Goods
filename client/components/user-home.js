import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import ImgMediaCard from './homeCard'

/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const {email} = props.user
  return (
    <div>
      <ImgMediaCard sport="" imageUrl="" />
      <h3>Welcome, {email}</h3>
      <Link to="/basketball/items">
        <img
          className="home-image"
          src="https://cdn.sqhk.co/sportcourt/2016/6/ihgjehc/110322_sc_0864-L.jpg"
          alt="basketball image"
        />
      </Link>
      <Link to="/baseball/items">
        <img
          className="home-image"
          src="https://3un4r442rlbaljcks42rrh8j-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/Batting-Cages-4.jpg"
          alt="baseball image"
        />
      </Link>
      <Link to="/football/items">
        <img
          className="home-image"
          src="https://lh3.googleusercontent.com/proxy/0AXimU68DcSk9_KGsqmtZBjNVaAJfETMFnYfT5FICxmtbKsuUZX0R_VUEAtpdGRdK6_fduqzsbmZIZi5WqV3dCebWiTz6MI-faIo844b6PlPPg886JA3HGzMZo1Xug"
          alt="football image"
        />
      </Link>
      <Link to="/eSports/items">
        <img
          className="home-image"
          src="https://2txp1g4bjeyvg8rqz491ffs8-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/A-Guide-To-Gaming-Platforms-For-Aspiring-Professional-Gamers.jpg"
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
