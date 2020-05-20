import React, {Component} from 'react';
import { Link } from 'react-router'
import Helmet from "react-helmet";
import { Parallax } from 'react-parallax';

import ModalButton from '../../components/ModalButton';
import GuitarSlider from '../../components/GuitarSlider';
import SignUpForm from '../../components/SignUpForm';
import ParallaxHero from '../../components/ParallaxHero';
import ContactCallout from '../../components/ContactCallout';

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
          desktopImage="https://blacksquare.nyc3.digitaloceanspaces.com/schillaci-guitars/Hero/schillaci_guitars_home_hero_desktop.jpg"
          mobileImage="https://blacksquare.nyc3.digitaloceanspaces.com/schillaci-guitars/Hero/schillaci_guitars_home_hero_mobile.jpg"
        />

        <div className="home__intro">
          <h1>Let's Build Your Next Guitar</h1>
          <p>Darren Schillaci has been building guitars for over twenty years. A lifelong player, he turns his passion into an unmatched precision that resonates from every guitar. When you order from Schillaci Guitars, you are guaranteed to receive a one of a kind instrument, built exactly to your precise needs and taste. 
          </p>
        </div>

        <ContactCallout />

        <div className="home__slider">
          <div className="home__slider__headline">
            <h2>Recently sold instruments</h2>
            <Link to="/guitars">
              <button className="btn--outline btn--small">View all</button>
            </Link>
          </div>
          <GuitarSlider /> 
        </div>

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
