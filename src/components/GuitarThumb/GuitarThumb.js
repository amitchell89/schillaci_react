import React, { Component } from 'react';
import { Link } from 'react-router';

export default class GuitarThumb extends Component {
  render() {

    var { link, thumb, name, price } = this.props;

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
