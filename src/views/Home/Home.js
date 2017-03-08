import React, {Component} from 'react';
import { Link } from 'react-router'
import Helmet from "react-helmet";
import ModalButton from '../../components/ModalButton'
import GuitarSlider from '../../components/GuitarSlider'
import { Parallax } from 'react-parallax';

export default class Home extends Component {
  render() {
    return (
      <div>
        <Helmet
          title="Page Title"
          meta={ [
            { name: "description", content: this.props.route.meta.meta_about },
            { property: "og:title", content: ''},
            { property: "og:url", content: ''},
            { property: "og:image", content: ''},
          ] }
        />

        <Parallax
          className="hero"
          bgImage="../../img/Guitar_Details/schillaci_guitars_detail_lsg_guitar_04.jpg"
          strength={400}
        >
        </Parallax>

        <div className="home__testimonial">
          <h2>"I'm blown away by this guitar. I can feel the rock solid construction and the neck is amazing. Thank you so much for your craftsmanship and for working with me on this idea."</h2>
          <p>- Adam Krichmar, Satisifed Customer</p>
        </div>
        <GuitarSlider />

        <Parallax
          className="hero"
          bgImage="../../img/Necks/schillaci_guitars_custom_necks_2.jpg"
          strength={400}
        >
          <div className="home__necks">
            <h2>Custom Necks</h2>
            <p>Looking for a replacement neck or upgrade? Schillaci Guitars is your premier source for hand crafted custom necks. Each neck is made to order in vintage or modern design.</p>
            <Link to="/necks">
              <button className="btn--outline">Learn More</button>
            </Link>
          </div>
        </Parallax>

      </div>
    )
  }
}
