import React, {Component} from 'react';
import Helmet from "react-helmet";

export default class Contact extends Component {
  render() {

    return (
      <div>
        <Helmet
          title=""
          meta={ [
            { name: "description", content: this.props.route.meta.meta_contact },
            { property: "og:title", content: ''},
            { property: "og:url", content: ''},
          ] }
          />
        <h2>
        Contact
        </h2>
        <form id="contact_form" method="post">
          <label>Your Name</label>
          <input type="text" name="name" placeholder="Your Name"></input>
          <label>Your Email Address</label>
          <input type="text" name="email" placeholder="Your Email"></input>
          <label>Your Message</label>
          <textarea type="text" name="message" placeholder="Your Message" rows="7"></textarea>
          <button type="submit" form="contact_form" value="Submit" className="btn--contact">Send Message</button>
        </form>
      </div>
    )
  }
}