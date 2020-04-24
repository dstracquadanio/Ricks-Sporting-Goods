import React from 'react'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import {NavLink} from 'react-router-dom'
import MenuIcon from '@material-ui/icons/Menu'
import PersonIcon from '@material-ui/icons/Person'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import AccountBoxIcon from '@material-ui/icons/AccountBox'

export default function AccountMenu(props) {
  const {isLoggedIn, handleLogout} = props
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const logoutAndClose = (event) => {
    handleClose(event)
    handleLogout()
  }

  return (
    <div>
      <Button
        // aria-controls="simple-menu"
        // aria-haspopup="true"
        onClick={handleClick}
      >
        <MenuIcon />
        {/* <AccountBoxIcon /> */}
      </Button>
      {isLoggedIn ? (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            Profile
          </MenuItem>
          <MenuItem onClick={logoutAndClose}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      ) : (
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <NavLink to="/login">
              <ListItemIcon>
                <VpnKeyIcon />
              </ListItemIcon>
              Login
            </NavLink>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <NavLink to="/signup">
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              Sign Up
            </NavLink>
          </MenuItem>
        </Menu>
      )}
    </div>
  )
}
