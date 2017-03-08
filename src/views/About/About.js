import React, {Component} from 'react';
import { Link } from 'react-router';
import Helmet from "react-helmet";
import { Parallax } from 'react-parallax';

export default class About extends Component {
  render() {

    return (
      <div>
        <Helmet
          title=""
          meta={ [
            { name: "description", content: this.props.route.meta.meta_contact },
            { property: "og:title", content: ''},
            { property: "og:url", content: ''},
          ] }
          />
        
        <Parallax
          className="hero"
          bgImage="../../img/About/Darren_Schillaci_In_The_Shop_Guitars.jpg"
          strength={400}
        >
        </Parallax>

        <div className="about__info">
          <h2>
          About
          </h2>
          <p>
            <span className="p__highlight">Darren Schillaci</span> has been building guitars for over twenty years. A lifelong player, he turns his passion into an unmatched precision that resonates from every guitar. When you order from Schillaci Guitars, you are guaranteed to receive a one of a kind instrument.
          </p>
          <p>
            All guitars are made 100% in house by one person, handcrafted to meet even the most particular player's needs. If you're not ready for the commitment of your own Schillaci guitar, consider replacing a lower grade import neck with an american made Schillaci neck to truly feel the difference.
          </p>
          <p>
            All guitar bodies are painted with sparkling Dupont paint (matched colors available upon request). Figured tops and bodies, natural woods, stains and sunburst finishes are also available.
          </p>
          <p>
            <span className="p__highlight">If you are interested in ordering a guitar or neck,</span> <Link to="/contact">continue to the contact page where you can send us an email.</Link>
          </p>
          <p>
            Photography by
          </p>
          <p>
            Tina Guay guayphotography@gmail.com
          </p>
          <p>
            Bill Harbold eharbold@comcast.net
          </p>
          <p>
            Website Design by <a href="http://www.mitchellaaron.com">Aaron Mitchell.</a>
          </p>
        </div>
      </div>
    )
  }
}