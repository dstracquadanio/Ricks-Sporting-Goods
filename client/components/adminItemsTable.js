import React, {Component} from 'react'
import MaterialTable from 'material-table'
import {tableIcons} from './iconsPackage'
import {getAllUsers, adminUpdateUser} from '../store/allUsers'
import {connect} from 'react-redux'
import {updateSingleItem, getItems} from '../store/items'

class AdminItemsTable extends Component {
  constructor() {
    super()
    this.state = {
      data: [],
    }
  }
  async componentDidMount() {
    await this.props.getItems()

    this.setState({
      data: this.props.items,
    })
  }
  render() {
    return (
      <MaterialTable
        icons={tableIcons}
        columns={[
          {title: 'id', field: 'id', type: 'numeric', editable: 'never'},
          {title: 'Product Name', field: 'name'},
          {title: 'Price', field: 'price', type: 'numeric'},
          {title: 'Quantity', field: 'quantity', type: 'numeric'},
          {title: 'Sport', field: 'sport'},
          {title: 'Description', field: 'description'},
          {title: 'ImageURL', field: 'imageUrl'},
        ]}
        data={this.state.data}
        editable={{
          onRowUpdate: async (newData, oldData) => {
            await this.setState({
              data: this.state.data.map((item) => {
                if (item.id === oldData.id) return newData
                return item
              }),
            })
          },
        }}
        actions={[
          {
            //DELETE ACTION
            icon: tableIcons.Delete,
            tooltip: 'Delete Item',
            onClick: (event, rowData) =>
              console.log('gotta make the whole delete user feature'),
          },
          {
            //SAVE CHANGES ACTION
            icon: tableIcons.Save,
            tooltip: 'Finalize Update',
            onClick: (event, rowData) => this.props.updateItem(rowData),
          },
        ]}
        title="Inventory"
      />
    )
  }
}

const mapState = (state) => ({
  items: state.items,
})

const mapDispatch = (dispatch) => ({
  updateItem: (changedUser) => dispatch(updateSingleItem(changedUser)),
  getItems: () => dispatch(getItems()),
})

export default connect(mapState, mapDispatch)(AdminItemsTable)
