import React, { Component } from 'react';
import { Link } from 'react-router';

export default class GuitarThumb extends Component {
  render() {

    var { thumb, name, price, thumb, i } = this.props;

    thumb = '../../img/' + thumb;
    let link = '/guitar/' + i;

    return (
      <Link to={link}>
        <div className="guitar__thumb">
          <img src={thumb} />
          <div className="guitar__thumb__label">
            <span className="guitar__thumb__label--name">{name}</span>
            <span className="guitar__thumb__label--price">{price}</span>
          </div>
        </div>
      </Link>
    )
  }
}
