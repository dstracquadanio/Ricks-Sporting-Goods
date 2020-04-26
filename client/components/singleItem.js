import React from 'react'
import {connect} from 'react-redux'
import {binarySearch} from './utility'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import CardMedia from '@material-ui/core/CardMedia'
import {
  Card,
  CardActionArea,
  Divider,
  MenuItem,
  Select,
  Button,
} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    maxWidth: 620,
  },
})

function SingleItemView(props) {
  const allItems = props.allItems
  const itemId = props.match.params.id
  const item = binarySearch(allItems, itemId)
  const classes = useStyles()
  return (
    <Paper className="single-item-page">
      {/* <Card className={classes.root}>
        <CardActionArea>
          <CardMedia component="img" height="620" image={item.imageUrl} />
        </CardActionArea>
      </Card> */}
      <div className="single-item-image">
        <img src={item.imageUrl} alt={`${item.name} image`} />
      </div>
      <div className="description container-center-column ">
        <p className="a">{item.name}</p>
        <p>SECTION FOR REVIEWS</p>
        {/* <Divider/> */}
        <p>{`$${item.price}`}</p>
        <p>QTY</p>
        <div>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={QTY}
            // onChange={handleChange}
          ></Select>
          <Button variant="contained">Add to cart</Button>
        </div>

        <p>Description</p>
        <p>{item.description}</p>
      </div>
    </Paper>
  )
}

const mapState = (state) => ({
  allItems: state.items,
})

export default connect(mapState, null)(SingleItemView)

//DARREN's stuff
// <div>
// {items.map((item) => {
//   if (String(item.id) === itemId) {
//       return (
//         <div key={item.id}>
//           <h3>Item: {item.name}</h3>
//           <img  src={item.imageUrl} />
//           <h3>Description: {item.description}</h3>
//           <h3>Price: ${item.price}</h3>
//           <h3>Quantity: {item.quantity}</h3>
//         </div>
//       )
//     }
//     return null
//   })}
// </div>

// const pStyle = {
//   width: '400px',
//   height: '400px',
//   border: '1px solid #ddd',
//   borderRadius: '4px',
//   padding: '5px',
// }
