import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllUsers} from '../store/allUsers'

export class ViewUsers extends Component {
  componentDidMount() {
    this.props.getAllUsers()
  }
  render() {
    const users = this.props.allUsers
    return (
      <div>
        {users.map((user) => {
          return (
            <div key={user.id}>
              <h2>{user.email}</h2>
            </div>
          )
        })}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allUsers: state.allUsers,
})

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(getAllUsers()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewUsers)
