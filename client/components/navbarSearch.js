import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateBar} from '../store/searchBar'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import SearchIcon from '@material-ui/icons/Search'

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
      <Paper
        className="searchbar"
        variant="outlined"
        elevation={0}
        component="form"
      >
        <SearchIcon id="search-icon" />

        <InputBase
          fullWidth={true}
          margin="dense"
          name="searchBar"
          type="search"
          value={this.state.searchBar}
          placeholder="Search..."
          onChange={this.handleChange}
        />

        <Divider orientation="vertical" />
      </Paper>
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
