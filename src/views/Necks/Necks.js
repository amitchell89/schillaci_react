import React, {Component} from 'react';
import Helmet from "react-helmet";
import { Parallax } from 'react-parallax';

export default class Necks extends Component {
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
        <Parallax className="hero" bgImage="../../img/Necks/schillaci_guitars_custom_necks.jpg" strength={400}>
        </Parallax>

        <div className="necks__info">
          <h2>Custom Necks</h2>
          <p>
          Schillaci Guitars is a manufacturer and seller of necks. Necks and neck profiles are made to order in vintage or modern design which feature one piece maple construction or rosewood slab board. Replacement necks are also available. Heel widths compatible to industry standards.
          </p>

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
          <h2>Microtonal Necks</h2>
          <p>
          Schillaci Guitars also specializes in custom microtonal necks. A Microtonal instrument uses intervals beyond the western system of 12 intervals per octave, opening up a world of new sounds and musical opportunities. Several styles of microtonal necks are available, each providing their own unique playing style and personality.
          </p>
          <p>The 19 Tone Equal Neck</p>
          <p>The 31 Tone Equal Neck</p>
          <p>The Fretless Flyer Neck</p>
        </div>
        <div className="necks__pictures">
          <img src="../../img/Necks/schillaci_guitars_microtonal_all_necks.jpg" />
          <img src="../../img/About/schillaci_guitars_shop_3.jpg" />
          <img src="../../img/About/schillaci_guitars_shop_2.jpg" />
         </div>
      </div>
    )
  }
}