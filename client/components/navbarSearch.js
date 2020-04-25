import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateBar} from '../store/searchBar'

class DisconnectedSearchBar extends Component {
  constructor() {
    super()
    this.state = {
      searchBar: '',
    }

    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(event) {
    await this.setState({
      [event.target.name]: event.target.value,
    })
    this.props.updateBar(this.state.searchBar)
  }

  render() {
    return (
      <form className="">
        <label htmlFor="searchBar">search: </label>
        <input
          type="text"
          name="searchBar"
          value={this.state.searchBar}
          onChange={this.handleChange}
        />
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    cart: state.cart,
    searchBar: state.searchBar,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateBar: (value) => dispatch(updateBar(value)),
  }
}

const SearchBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(DisconnectedSearchBar)

export default SearchBar
