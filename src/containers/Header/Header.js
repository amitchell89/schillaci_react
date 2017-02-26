import React, {Component} from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <header>
          <Link to="/">Home</Link>
          <Link to="/guitars">Guitars</Link>
          <Link to="/necks">Necks</Link>
          <Link to="/microtonal">Microtonal</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
      </header>
    )
  }
}