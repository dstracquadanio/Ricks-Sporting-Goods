import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  root: {
    maxWidth: 620,
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
      {/* <CardActions className="container-center-column">
        <Button size="large" color="primary">
          <Link to={`/${sport}/items`}>{sport} </Link>
        </Button>
      </CardActions> */}
    </Card>
  )
}
