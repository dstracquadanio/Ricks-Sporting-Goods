import SwipeableViews from 'react-swipeable-views'
import {autoPlay} from 'react-swipeable-views-utils'
import React, {Component} from 'react'
import ImgMediaCard from './homeCard'
// import Dots from '@mat'
const AutoPlaySwipeableViews = autoPlay(SwipeableViews)

export default class homeCarousel extends Component {
  constructor() {
    super()
    this.state = {
      carouselIndex: 0,
    }
  }

  handleChangeIndex = (carouselIndex) => {
    this.setState({
      carouselIndex,
    })
  }

  render() {
    const {carouselIndex} = this.state

    return (
      <div>
        <AutoPlaySwipeableViews
          className="test"
          index={carouselIndex}
          onChangeIndex={this.handleChangeIndex}
          interval={7500}
        >
          <div className="container-row">
            <ImgMediaCard
              sport="basketball"
              imageUrl="https://cdn.sqhk.co/sportcourt/2016/6/ihgjehc/110322_sc_0864-L.jpg"
            />
            <ImgMediaCard
              sport="basketball"
              imageUrl="https://cdn.sqhk.co/sportcourt/2016/6/ihgjehc/110322_sc_0864-L.jpg"
            />
            <ImgMediaCard
              sport="basketball"
              imageUrl="https://cdn.sqhk.co/sportcourt/2016/6/ihgjehc/110322_sc_0864-L.jpg"
            />
          </div>
          <div className="container-row">
            <ImgMediaCard
              sport="baseball"
              imageUrl="https://3un4r442rlbaljcks42rrh8j-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/Batting-Cages-4.jpg"
            />
            <ImgMediaCard
              sport="baseball"
              imageUrl="https://3un4r442rlbaljcks42rrh8j-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/Batting-Cages-4.jpg"
            />
            <ImgMediaCard
              sport="baseball"
              imageUrl="https://3un4r442rlbaljcks42rrh8j-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/Batting-Cages-4.jpg"
            />
          </div>
          <div className="container-row">
            <ImgMediaCard
              sport="eSports"
              imageUrl="https://2txp1g4bjeyvg8rqz491ffs8-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/A-Guide-To-Gaming-Platforms-For-Aspiring-Professional-Gamers.jpg"
            />
            <ImgMediaCard
              sport="eSports"
              imageUrl="https://2txp1g4bjeyvg8rqz491ffs8-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/A-Guide-To-Gaming-Platforms-For-Aspiring-Professional-Gamers.jpg"
            />
            <ImgMediaCard
              sport="eSports"
              imageUrl="https://2txp1g4bjeyvg8rqz491ffs8-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/A-Guide-To-Gaming-Platforms-For-Aspiring-Professional-Gamers.jpg"
            />
          </div>
        </AutoPlaySwipeableViews>
      </div>
    )
  }
}
