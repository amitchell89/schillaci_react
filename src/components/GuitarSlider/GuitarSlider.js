import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';
require('slick-carousel/slick/slick-theme.scss');
require('slick-carousel/slick/slick.scss');

function mapStateToProps(state) {
   return {
    guitars: state.guitars
  };
}

class GuitarSlider extends Component {
  render() {

    var { guitars } = this.props;

    var settings = {
      arrows: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true
    };

    const guitarSlides = (
      <Slider {...settings}>
        {guitars.map(function (s, i) {

          let slide = '../../img/' + s.slider_photo;
          return (
            <div className="guitar__slide">
              <img src={slide} />
            </div>
          )}.bind(this))}
      </Slider>
    );

    return (
      <div>
        {guitarSlides}
      </div>
    )
  }
}

export default connect(mapStateToProps,)(GuitarSlider);