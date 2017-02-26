import React, {Component} from 'react';
import { Link } from 'react-router';
import Logo from '../../components/Logo'

export default class Header extends Component {
  render() {
    return (
      <header>
          <div className="header content_wrapper">
            <Logo />
            <p className="header__tagline">Made in the USA</p>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/guitars">Guitars</Link>
              <Link to="/necks">Necks</Link>
              <Link to="/microtonal">Microtonal</Link>
              <Link to="/about">About</Link>
              <Link to="/contact">Contact</Link>
            </nav>
          </div>
      </header>
    )
  }
}