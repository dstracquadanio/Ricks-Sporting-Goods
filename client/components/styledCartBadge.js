import React from 'react'
import Badge from '@material-ui/core/Badge'
import {withStyles} from '@material-ui/core/styles'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 0,
    top: 8,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge)

export default function StyledCartBadge(props) {
  return (
    <StyledBadge badgeContent={props.cartTotal} color="secondary">
      <ShoppingCartIcon fontSize="large" />
    </StyledBadge>
  )
}
