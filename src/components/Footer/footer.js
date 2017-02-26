import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    let year = new Date().getFullYear();
    return (
      <footer>
        <p>&copy; {year}</p>
      </footer>
    )
  }
}