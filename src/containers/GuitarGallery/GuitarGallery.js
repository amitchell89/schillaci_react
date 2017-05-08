import React, { Component } from 'react';
import { Link } from 'react-router';

import GuitarThumb from '../../components/GuitarThumb';

export default class GuitarGallery extends Component {
  render() {

    var { guitars } = this.props;

    return (
      <div className="guitar__gallery">
        {guitars.map(function (s, i) {
          return (
            <GuitarThumb thumb={s.thumb_photo} name={s.name} price={s.price} i={i} />
          )}.bind(this))}
      </div>
    )
  }
}
