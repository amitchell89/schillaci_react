import React, {Component} from 'react';
import { Parallax } from 'react-parallax';

export default class ParallaxHero extends Component {
  render() {
    let { desktopImage, mobileImage } = this.props;

    return (
      <div className="ParallaxHero">

        <Parallax
          className="parallax parallax--desktop parallax--hero expand"
          bgImage={desktopImage}
          strength={400}
        >
        </Parallax>

        <Parallax
          className="parallax parallax--mobile parallax--hero expand"
          bgImage={mobileImage}
          strength={400}
        >
        </Parallax>

      </div>
    )
  }
}