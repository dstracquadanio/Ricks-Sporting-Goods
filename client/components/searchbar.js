import React, {Component} from 'react'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import SearchIcon from '@material-ui/icons/Search'

export default class Searchbar extends Component {
  render() {
    return (
      <Paper
        className="searchbar"
        variant="outlined"
        elevation={0}
        component="form"
      >
        <SearchIcon id="search-icon" />
        {/* <IconButton aria-label="menu">
          <MenuIcon />
        </IconButton> */}
        <InputBase
          fullWidth={true}
          margin="dense"
          name="??"
          type="search"
          placeholder="Search..."
        />
        {/* <IconButton type="submit" aria-label="search"> */}

        {/* </IconButton> */}
        <Divider orientation="vertical" />
      </Paper>
    )
  }
}
