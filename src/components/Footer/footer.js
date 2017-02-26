import React, {Component} from 'react';

export default class Footer extends Component {
  render() {
    let year = new Date().getFullYear();
    return (
      <footer>
        <div className="footer content_wrapper">
          <p>&copy; {year}  Schillaci Guitars - Guitars, Basses and Necks Made to Order</p>
        </div>
      </footer>
    )
  }
}