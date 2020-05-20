import React, { Component } from 'react';
import { Link } from 'react-router';

export default class ContactCallout extends Component {

  render() {
    return (
      <div className="ContactCallout">
        <div className="ContactCallout__info">
          <div className="ContactCallout__img">
            <img src="https://blacksquare.nyc3.digitaloceanspaces.com/schillaci-guitars/Logos/schillaci_s_logo_blue.png" />
          </div>
          <div className="ContactCallout__copy">
            <h3>Ready to build? Send us a message detailing what you're looking for to receive a quote.</h3> 
          </div>
        </div>
        <div className="ContactCallout__button">
          <Link to="/contact">
            <button className="btn--outline">Send us a message</button>
          </Link>
        </div>
      </div>
    )
  }
}
