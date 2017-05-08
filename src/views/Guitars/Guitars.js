import React, {Component} from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";
import { Link } from 'react-router';

import GuitarThumb from '../../components/GuitarThumb';

function mapStateToProps(state) {
   return {
    guitars: state.guitars
  };
}

class Guitars extends Component {
  render() {
    const { guitars } = this.props;

    const guitar_list = guitars.filter(function(n) {
      return n.hidden !== true && n.type === 'guitar';
    });

    const bass_list = guitars.filter(function(n) {
      return n.hidden !== true && n.type === 'bass';
    });

    console.log('check', guitars)

    const guitarThumbs = (
      <div className="guitar__gallery">
        {guitar_list.map(function (s, i) {
          let thumb = '../../img/' + s.thumb_photo;
          let link = '/guitar/' + i;
          return (
            <GuitarThumb link={link} thumb={thumb} name={s.name} price={s.price} />
          )}.bind(this))}
      </div>
    )

    const bassThumbs = (
      <div className="guitar__gallery">
        {bass_list.map(function (s, i) {
          let thumb = '../../img/' + s.thumb_photo;
          let link = '/guitar/' + i;
          return (
            <GuitarThumb link={link} thumb={thumb} name={s.name} price={s.price} />
          )}.bind(this))}
      </div>
    )

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
        <div className="guitar__thumb__container">
          <h2>Bolt On Guitars</h2>
          <div>{guitarThumbs}</div>
          <h2>Set Neck Guitars</h2>
          <h2>Bolt On Basses</h2>
          <div>{bassThumbs}</div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Guitars);