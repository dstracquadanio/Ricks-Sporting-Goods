import React from 'react'
import clsx from 'clsx'
import {makeStyles} from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import history from '../history'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import SportsBasketballIcon from '@material-ui/icons/SportsBasketball'
import SportsFootballIcon from '@material-ui/icons/SportsFootball'
import SportsBaseballIcon from '@material-ui/icons/SportsBaseball'
import SportsSoccerIcon from '@material-ui/icons/SportsSoccer'
import SportsEsportsIcon from '@material-ui/icons/SportsEsports'
import GroupIcon from '@material-ui/icons/Group'
import CreateIcon from '@material-ui/icons/Create'
import PostAddIcon from '@material-ui/icons/PostAdd'

const useStyles = makeStyles({
  menu: {
    width: 250,
  },
})

export default function NavDrawer(props) {
  const {isLoggedIn, handleLogout, isAdmin} = props

  const classes = useStyles()
  const [state, setState] = React.useState({
    //this allows us to use state while keeping component as function
    isOpen: false,
  })

  const toggleDrawer = (boolean) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({...state, isOpen: boolean})
  }

  const handleRedirect = (strMethod) => {
    history.push(`/${strMethod}`)
  }

  const menu = () => (
    <div
      className={clsx(classes.menu)}
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      {isLoggedIn ? (
        <List>
          <ListItem button onClick={() => handleRedirect('user/profile')}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </ListItem>

          <ListItem button onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      ) : (
        <List>
          <ListItem button onClick={() => handleRedirect('login')}>
            <ListItemIcon>
              <VpnKeyIcon />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>

          <ListItem button onClick={() => handleRedirect('signup')}>
            <ListItemIcon>
              <PersonAddIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Up" />
          </ListItem>
        </List>
      )}
      <Divider />
      {isAdmin && (
        <List>
          <ListItem button onClick={() => handleRedirect('admin/users')}>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="All Users" />
          </ListItem>

          <ListItem button onClick={() => handleRedirect('admin/addItems')}>
            <ListItemIcon>
              <PostAddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Item" />
          </ListItem>

          <ListItem button onClick={() => handleRedirect('admin/updateItems')}>
            <ListItemIcon>
              <CreateIcon />
            </ListItemIcon>
            <ListItemText primary="Update Item" />
          </ListItem>
        </List>
      )}
      <Divider />
      <List>
        <ListItem button onClick={() => handleRedirect('basketball/items')}>
          <ListItemIcon>
            <SportsBasketballIcon />
          </ListItemIcon>
          <ListItemText primary="Basketball" />
        </ListItem>

        <ListItem button onClick={() => handleRedirect('football/items')}>
          <ListItemIcon>
            <SportsFootballIcon />
          </ListItemIcon>
          <ListItemText primary="Football" />
        </ListItem>

        <ListItem button onClick={() => handleRedirect('soccer/items')}>
          <ListItemIcon>
            <SportsSoccerIcon />
          </ListItemIcon>
          <ListItemText primary="Soccer" />
        </ListItem>

        <ListItem button onClick={() => handleRedirect('baseball/items')}>
          <ListItemIcon>
            <SportsBaseballIcon />
          </ListItemIcon>
          <ListItemText primary="Baseball" />
        </ListItem>

        <ListItem button onClick={() => handleRedirect('gaming/items')}>
          <ListItemIcon>
            <SportsEsportsIcon />
          </ListItemIcon>
          <ListItemText primary="Gaming" />
        </ListItem>
      </List>
    </div>
  )

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon fontSize="large" />
      </Button>
      <Drawer anchor="left" open={state.isOpen} onClose={toggleDrawer(false)}>
        {menu()}
      </Drawer>
    </div>
  )
}
