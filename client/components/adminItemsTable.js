/* eslint-disable react/no-access-state-in-setstate */
import React, {Component} from 'react'
import MaterialTable from 'material-table'
import {tableIcons} from './iconsPackage'
import {connect} from 'react-redux'
import {
  updateSingleItem,
  getItems,
  removeSingleItem,
  postItem,
} from '../store/items'

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
          {
            title: 'id',
            field: 'id',
            type: 'numeric',
            editable: 'never',
            defaultSort: 'asc',
          },
          {title: 'Product Name', field: 'name'},
          {
            title: 'Description',
            field: 'description',
            render: (rowData) =>
              rowData.description
                ? rowData.description.slice(0, 140) + '...'
                : '',
          },
          {title: 'Price', field: 'price', type: 'currency'},
          {title: 'Quantity', field: 'quantity', type: 'numeric'},
          {title: 'Sport', field: 'sport'},

          {
            title: 'ImageURL',
            field: 'imageUrl',
            render: (rowData) => (
              <img src={rowData.imageUrl} style={{width: 80}} />
            ),
          },
        ]}
        data={this.state.data}
        editable={{
          //UPDATE ITEM
          onRowUpdate: async (newData, oldData) => {
            await this.setState({
              data: this.state.data.map((item) => {
                if (item.id === oldData.id) return newData
                return item
              }),
            })
            this.props.updateItem(newData)
          },
          //DELETE ITEM
          onRowDelete: async (oldData) => {
            await this.setState({
              data: this.state.data.filter((item) => item.id !== oldData.id),
            })
            this.props.deleteItem(oldData.id)
          },
          //ADD A NEW ITEM
          onRowAdd: async (newData) => {
            const proxyData = [...this.state.data]
            proxyData.push(newData)
            await this.setState({
              data: proxyData,
            })
            this.props.postItem(newData)
          },
        }}
        style={{
          margin: '2em',
          padding: '3em',
        }}
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
  deleteItem: (itemId) => dispatch(removeSingleItem(itemId)),
  postItem: (newItem) => dispatch(postItem(newItem)),
})

export default connect(mapState, mapDispatch)(AdminItemsTable)
