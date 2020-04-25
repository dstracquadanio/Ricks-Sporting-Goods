import SwipeableViews from 'react-swipeable-views'
import {autoPlay} from 'react-swipeable-views-utils'
import React, {Component} from 'react'
import ImgMediaCard from './homeCard'
import MobileStepper from '@material-ui/core/MobileStepper'

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
      <div className="container-center-column">
        <AutoPlaySwipeableViews
          className="test"
          index={carouselIndex}
          onChangeIndex={this.handleChangeIndex}
          interval={7500}
        >
          <div className="container-center-column">
            <div className="container-row">
              <ImgMediaCard
                sport="basketball"
                imageUrl="https://images.squarespace-cdn.com/content/v1/52e7bca9e4b0357d590a94ef/1568667662463-G88BGK7DH3X01IPEYMAP/ke17ZwdGBToddI8pDm48kLkXF2pIyv_F2eUT9F60jBl7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0iyqMbMesKd95J-X4EagrgU9L3Sa3U8cogeb0tjXbfawd0urKshkc5MgdBeJmALQKw/20190808_NIKEACADEMY_JL_9106.JPG"
              />
              <ImgMediaCard
                sport="basketball"
                imageUrl="https://cdn.sqhk.co/sportcourt/2016/6/ihgjehc/110322_sc_0864-L.jpg"
              />
              <ImgMediaCard
                sport="basketball"
                imageUrl="https://i.insider.com/5a8317cdd03072c20f8b45c5?width=1100&format=jpeg&auto=webp"
              />
            </div>
          </div>
          <div className="container-center-column">
            <div className="container-row">
              <ImgMediaCard
                sport="football"
                imageUrl="https://journalistsresource.org/wp-content/uploads/2017/10/keith-johnston-football-unsplash-720x480.jpg"
              />
              <ImgMediaCard
                sport="football"
                imageUrl="https://usatftw.files.wordpress.com/2019/10/usp-ncaa-football_-georgia-southern-at-minnesota.jpg?w=1000&h=600&crop=1"
              />
              <ImgMediaCard
                sport="football"
                imageUrl="https://s7d2.scene7.com/is/image/dksfed/CLP_052_Football_MarchWk5_S1_adiThreeStripe"
              />
            </div>
          </div>
          <div className="container-center-column">
            <div className="container-row">
              <ImgMediaCard
                sport="baseball"
                imageUrl="https://www.ussportscamps.com/media/images/baseball/nike/camps/Nike-Baseball-Gallery-3.jpg"
              />
              <ImgMediaCard
                sport="baseball"
                imageUrl="https://images.squarespace-cdn.com/content/v1/5ab4527b3c3a536a7a352c05/1556208232440-NCQ049ZH4NA3MT7N7KAT/ke17ZwdGBToddI8pDm48kPWjBUchqXhHkLi7C6gbGN57gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UQ3mZcicgkGrzrAt5t_D8AwpAnnGt_csIYyZAhqLV-JAQKnkgu1CjACuGd09OcDW5A/536984.jpg?format=2500w"
              />
              <ImgMediaCard
                sport="baseball"
                imageUrl="https://3un4r442rlbaljcks42rrh8j-wpengine.netdna-ssl.com/wp-content/uploads/2019/03/Batting-Cages-4.jpg"
              />
            </div>
          </div>
          <div className="container-center-column">
            <div className="container-row">
              <ImgMediaCard
                sport="eSports"
                imageUrl="https://www.reviews.org/app/uploads/2019/06/best-internet-for-gaming_feat2.jpeg"
              />
              <ImgMediaCard
                sport="eSports"
                imageUrl="https://2txp1g4bjeyvg8rqz491ffs8-wpengine.netdna-ssl.com/wp-content/uploads/2019/12/A-Guide-To-Gaming-Platforms-For-Aspiring-Professional-Gamers.jpg"
              />
              <ImgMediaCard
                sport="eSports"
                imageUrl="https://cdn.logojoy.com/wp-content/uploads/20191003120146/How-to-Start-a-Gaming-Channel-02-1024x624.png"
              />
            </div>
          </div>
        </AutoPlaySwipeableViews>
        <MobileStepper
          className="center-self"
          variant="dots"
          steps={4}
          position="static"
          activeStep={carouselIndex}
        />
      </div>
    )
  }
}
