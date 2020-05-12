import React, {Component} from 'react';
import { Link } from 'react-router'
import Helmet from "react-helmet";
import { Parallax } from 'react-parallax';

import ModalButton from '../../components/ModalButton';
import GuitarSlider from '../../components/GuitarSlider';
import SignUpForm from '../../components/SignUpForm';
import ParallaxHero from '../../components/ParallaxHero';

export default class Home extends Component {
  render() {

    const hero = 'Guitar_Details/schillaci_guitars_detail_lsg_guitar_04.jpg'
    return (
      <div>
        <Helmet
          title="Schillaci Guitars: Custom Guitars & Necks Made To Order."
          meta={ [
            { name: "description", content: this.props.route.meta.meta_standard },
            { property: "og:title", content: 'Schillaci Guitars: Custom Guitars & Necks Made To Order.'},
            { property: "og:url", content: 'https://schillaciguitars.com'},
            { property: "og:image", content: 'https://schillaciguitars.com/img/' + hero },
          ] }
        />

        <ParallaxHero 
          desktopImage="../../img/Guitar_Details/schillaci_guitars_detail_lsg_guitar_04.jpg"
          mobileImage="../../img/Guitar_Details/schillaci_guitars_detail_lsg_guitar_04.jpg"
        />

        <div className="home__tagline">
          <h1>Let's Build Your Next Guitar</h1>
          <p>Guitars, Basses and Necks Made to Order</p>
          <Link to="/guitars">
            <button className="btn--outline">View All Guitars</button>
          </Link>
        </div>

        <GuitarSlider />

        <div className="home__testimonial expand">
          <h2>"I'm blown away by this guitar. I can feel the rock solid construction and the neck is amazing. Thank you so much for your craftsmanship and for working with me on this idea."</h2>
          <p>- Adam Krichmar, Satisifed Customer</p>
        </div>

        <Parallax
          className="parallax expand"
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
        <SignUpForm />
        <div className="home__logo">
          <div className="Logo"></div>
        </div>

      </div>
    )
  }
}
