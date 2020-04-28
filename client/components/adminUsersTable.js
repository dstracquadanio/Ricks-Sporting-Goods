/* eslint-disable react/no-access-state-in-setstate */
import React, {Component} from 'react'
import MaterialTable from 'material-table'
import {tableIcons} from './iconsPackage'
import {getAllUsers, adminUpdateUser, deleteUser} from '../store/allUsers'
import {connect} from 'react-redux'

class AdminUsersTable extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
    }
  }
  async componentDidMount() {
    await this.props.getAllUsers()
    this.setState({
      data: this.props.allUsers,
    })
  }
  render() {
    return (
      <MaterialTable
        icons={tableIcons}
        columns={[
          {title: 'id', field: 'id', type: 'numeric', editable: 'never'},
          {title: 'First Name', field: 'firstName'},
          {title: 'Last Name', field: 'lastName'},
          {title: 'Email', field: 'email'},
          {title: 'isAdmin', field: 'isAdmin', type: 'boolean'},
        ]}
        data={this.state.data}
        editable={{
          //UPDATE USER
          onRowUpdate: async (newData, oldData) => {
            await this.setState({
              data: this.state.data.map((user) => {
                if (user.id === oldData.id) return newData
                return user
              }),
            })
            this.props.updateUser(newData)
          },
          //DELETE USER
          onRowDelete: async (oldData) => {
            await this.setState({
              data: this.state.data.filter((user) => user.id !== oldData.id),
            })
            this.props.deleteUser(oldData.id)
          },
        }}
        title="Users"
      />
    )
  }
}

const mapState = (state) => ({
  allUsers: state.allUsers,
})

const mapDispatch = (dispatch) => ({
  updateUser: (changedUser) => dispatch(adminUpdateUser(changedUser)),
  getAllUsers: () => dispatch(getAllUsers()),
  deleteUser: (userId) => dispatch(deleteUser(userId)),
})

export default connect(mapState, mapDispatch)(AdminUsersTable)
