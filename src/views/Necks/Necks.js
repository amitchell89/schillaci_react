import React, {Component} from 'react';
import { Link } from 'react-router';
import Helmet from "react-helmet";

import ParallaxHero from '../../components/ParallaxHero';

export default class Necks extends Component {
  render() {
    const hero = 'Necks/schillaci_guitars_custom_necks.jpg';
    return (
      <div>
        <Helmet
          title=""
          meta={ [
            { name: "description", content: this.props.route.meta.meta_necks },
            { property: "og:title", content: 'Schillaci Guitars: Custom Made Necks.'},
            { property: "og:url", content: 'https://schillaciguitars.com/necks'},
            { property: "og:image", content: 'https://schillaciguitars.com/img/' + hero },
          ] }
          />

        <ParallaxHero 
          desktopImage={"../../img/" + hero}
          mobileImage={"../../img/" + hero}
        />

        <div className="necks__info">
          <h2>Custom Necks</h2>
          <p>
          Schillaci Guitars is a manufacturer and seller of necks. Necks and neck profiles are made to order in vintage or modern design which feature one piece maple construction or rosewood slab board. Replacement necks are also available. Heel widths compatible to industry standards.
          </p>

          <div className="center">
            <h4>Classic Right Handed Neck</h4>
            <img className="necks__img" src="../../img/Necks/schillaci_guitars_neck_right_handed.png" />
            <h4>Classic Left Handed Neck</h4>
            <img className="necks__img" src="../../img/Necks/schillaci_guitars_neck_left_handed.png" />
          </div>

          <div className="necks__specs">
            <div className="necks__spec-list necks__spec-list--profiles">
            <p className="necks__spec-list__header">Necks and Neck Profiles resembling:</p>
              <p>20 Fret Bass Rose Slab Fingerboard</p>
              <p>20 Fret Bass 1 Pc w/ Plug</p> 
              <p>21 Fret Guitar, 50's 1 Pc w/ Plug</p> 
              <p>21 Fret Guitar 60's Rose Slab Fingerboard</p>
              <p>21 Fret Guitar 70's 1 Pc w/ Bullet</p>
              <p>22 Fret Guitar w/ Upper Truss Rod Adjustment</p> 
            </div>

            <div className="necks__spec-list necks__spec-list--nuts">
            <p className="necks__spec-list__header">Nut widths available:</p>
              <p>4 String Bass 1 9/16" (make fraction smaller if can)</p> 
              <p>5 String Bass 1 11/16"</p>
              <p>6 String Guitar 1 5/8" Vintage</p> 
              <p>6 String Guitar 1 11/16" Modern</p>
              <p>6 String Guitar 1 3/4" Oversize</p> 
              <p>7 String Guitar 1 7/8"</p>
            </div>
          </div>

          <h2>Microtonal Necks</h2>
          <p>
          Schillaci Guitars also specializes in custom microtonal necks. A Microtonal instrument uses intervals beyond the western system of 12 intervals per octave, opening up a world of new sounds and musical opportunities. Several styles of microtonal necks are available, each providing their own unique playing style and personality.
          </p>
          <div className="center">
            <h4>The 19 Tone Equal Neck</h4>
            <img className="necks__img" src="../../img/Necks/schillaci_guitars_microtonal_neck_19_tone.png" />
            <h4>The 31 Tone Equal Neck</h4>
            <img className="necks__img" src="../../img/Necks/schillaci_guitars_microtonal_neck_31_tone.png" />
            <h4>The Fretless Neck</h4>
            <img className="necks__img" src="../../img/Necks/schillaci_guitars_neck_fretless.png" />
          </div>
        </div>

        <div className="necks__cta center">
          <h2>Interested in ordering a neck?</h2>
          <Link to="/contact">
            <button className="btn--outline">Send Us a Message</button>
          </Link>
        </div>
        <div className="necks__fan center">
          <img className="necks__img necks__img--fan" src="../../img/Necks/schillaci_guitars_neck_fan.jpg" />
        </div>
      </div>
    )
  }
}