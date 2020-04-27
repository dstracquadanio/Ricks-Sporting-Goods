import React, {Component} from 'react'
import MaterialTable from 'material-table'
import {tableIcons} from './iconsPackage'
import {updateUserProfile} from '../store/user'
import {getAllUsers} from '../store/allUsers'
import {connect} from 'react-redux'

class AdminTable extends Component {
  componentDidMount() {
    this.props.getAllUsers()
  }
  render() {
    return (
      // <div style={{maxWidth: '100%'}}>
      <MaterialTable
        icons={tableIcons}
        columns={[
          {title: 'Id', field: 'id', type: 'numeric'},
          {title: 'First Name', field: 'firstName'},
          {title: 'Last Name', field: 'lastName'},
          {title: 'Email', field: 'email'},
          {title: 'isAdmin', field: 'isAdmin', type: 'boolean'},
        ]}
        data={
          this.props.allUsers

          /* [
          {
            id: 1,
            firstName: 'Sam',
            lastName: 'McSmith',
            email: 'cody@email.com',
            isAdmin: true,
          },
          {
            id: 2,
            firstName: 'Cody',
            lastName: 'McSmith',
            email: 'cody@email.com',
            isAdmin: true,
          },
        ] */
        }
        actions={[
          {
            icon: tableIcons.Add,
            tooltip: 'Remove User',
            onClick: (event, rowData) =>
              alert('You saved ' + rowData.firstName),
          },
          {
            icon: tableIcons.Edit,
            tooltip: 'Edit User',
            onClick: (event, userInfo) =>
              this.props.updateUser(userInfo.id, userInfo),
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
  updateUser: (id, changedUser) => dispatch(updateUserProfile(id, changedUser)),
  getAllUsers: () => dispatch(getAllUsers()),
})

export default connect(mapState, mapDispatch)(AdminTable)
