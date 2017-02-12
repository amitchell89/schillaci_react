import React, {Component} from 'react';
import { Link } from 'react-router';

export default class Header extends Component {
  render() {
    return (
      <header>
        <h1>
          <Link to="/">Home</Link>
        </h1>
      </header>
    )
  }
}