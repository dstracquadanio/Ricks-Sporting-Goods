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
import {withStyles} from '@material-ui/core/styles'

export default function AccountMenu(props) {
  const StyledMenu = withStyles({
    paper: {
      border: '1px solid #d3d4d5',
      backgroundColor: '#F7F5FB',
      borderRadius: '1px',
    },
  })((props) => <Menu {...props} />)

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
      <Button onClick={handleClick}>
        <MenuIcon />
        {/* <AccountBoxIcon /> */}
      </Button>
      {isLoggedIn ? (
        <StyledMenu
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
          <hr />
          <MenuItem onClick={logoutAndClose}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
        </StyledMenu>
      ) : (
        <StyledMenu
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
          <hr />
          <MenuItem onClick={handleClose}>
            <NavLink to="/signup">
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              Sign Up
            </NavLink>
          </MenuItem>
        </StyledMenu>
      )}
    </div>
  )
}
