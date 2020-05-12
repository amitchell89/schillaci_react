import React, {Component} from 'react';
import { Link } from 'react-router';
import Helmet from "react-helmet";

import ParallaxHero from '../../components/ParallaxHero';

export default class About extends Component {
  render() {
    const hero = 'About/Darren_schillaci_Guitrars_Shop_2.jpg';
    return (
      <div>
        <Helmet
          title=""
          meta={ [
            { name: "description", content: this.props.route.meta.meta_about },
            { property: "og:title", content: 'Schillaci Guitars: About'},
            { property: "og:url", content: 'https://schillaciguitars.com/about'},
            { property: "og:image", content: 'https://schillaciguitars.com/img/Schillaci_Guitars_Logo.png' },
            { property: "og:image", content: 'https://schillaciguitars.com/img/' + hero },
          ] }
          />

        <ParallaxHero 
          desktopImage={"../../img/" + hero}
          mobileImage={"../../img/" + hero}
        />

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
            <span className="p__highlight">Interested in ordering a guitar or neck?</span>
          </p>
          <Link to="/contact">
            <button className="btn--outline">Send us a Message</button>
          </Link>
          <div className="about__credits">
            <p>
              Website Design by <a href="http://www.mitchellaaron.com">Aaron Mitchell</a>
            </p>
            <p>
              Site Photography by
            </p>
            <p>
              Shaun Murphree stmphotography@yahoo.com
            </p>
            <p>
              Tina Guay guayphotography@gmail.com
            </p>
            <p>
              Bill Harbold eharbold@comcast.net
            </p>
          </div>
        </div>
      </div>
    )
  }
}