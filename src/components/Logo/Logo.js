import React, {Component} from 'react';
import { Link } from 'react-router';

export default class Logo extends Component {
  render() {
    return (
      <Link to="/">
        <div className="Logo"></div>
      </Link>
    )
  }
}