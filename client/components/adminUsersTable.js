import React, {Component} from 'react'
import MaterialTable from 'material-table'
import {tableIcons} from './iconsPackage'
import {getAllUsers, adminUpdateUser} from '../store/allUsers'
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
          onRowUpdate: async (newData, oldData) => {
            await this.setState({
              data: this.state.data.map((user) => {
                if (user.id === oldData.id) return newData
                return user
              }),
            })
          },
        }}
        actions={[
          {
            //DELETE ACTION
            icon: tableIcons.Delete,
            tooltip: 'Delete User',
            onClick: (event, rowData) =>
              console.log('gotta make the whole delete user feature'),
          },
          {
            //SAVE CHANGES ACTION
            icon: tableIcons.Save,
            tooltip: 'Finalize Update',
            onClick: (event, userInfo) => this.props.updateUser(userInfo),
          },
        ]}
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
})

export default connect(mapState, mapDispatch)(AdminUsersTable)
