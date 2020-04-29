import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardMedia from '@material-ui/core/CardMedia'
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 640,
  },
})

export default function ImgMediaCard(props) {
  const {sport, imageUrl} = props
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <Link to={`/${sport}/items`}>
        <CardActionArea>
          <CardMedia
            component="img"
            alt="slide"
            height="500"
            image={imageUrl}
          />
        </CardActionArea>
      </Link>
    </Card>
  )
}
