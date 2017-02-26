import React, {Component} from 'react';
import { Link } from 'react-router';
import Logo from '../../components/Logo'

export default class Header extends Component {
  render() {
    return (
      <header>
          <Logo />
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