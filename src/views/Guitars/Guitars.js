import React, {Component} from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";
import { Link } from 'react-router';

import GuitarGallery from '../../containers/GuitarGallery';
import ContactCallout from '../../components/ContactCallout';

function mapStateToProps(state) {
   return {
    guitars: state.guitars
  };
}

class Guitars extends Component {
  render() {

    const guitars = this.props.guitars.filter(function(n) {
      return n.hidden !== true;
    });

    const hammerhead_list = guitars.filter(function(n) {
      return n.type === 'guitar' && n.style === 'hammerhead';
    });

    const knucklehead_list = guitars.filter(function(n) {
      return n.type === 'guitar' && n.style === 'knucklehead';
    });

    const combined_guitar_list = knucklehead_list.concat(hammerhead_list);

    const set_neck_list = guitars.filter(function(n) {
      return n.type === 'guitar' && n.style === 'set';
    });

    const bass_list = guitars.filter(function(n) {
      return n.type === 'bass';
    });

    return (
      <div>
        <Helmet
          title=""
          meta={ [
            { name: "description", content: this.props.route.meta.meta_guitars },
            { property: "og:title", content: 'Schillaci Guitars: Custom Guitars.'},
            { property: "og:url", content: 'https://schillaciguitars.com/guitars'},
            { property: "og:image", content: 'https://schillaciguitars.com/img/Schillaci_Guitars_Logo.png' },
          ] }
          />
        <div className="guitar__gallery__container">
          <h2>Guitars</h2>
          <GuitarGallery guitars={combined_guitar_list} />
          <h2>Set Neck Guitars</h2>
          <GuitarGallery guitars={set_neck_list} />
          <h2>Bass Guitars</h2>
          <GuitarGallery guitars={bass_list} />
          <ContactCallout />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Guitars);