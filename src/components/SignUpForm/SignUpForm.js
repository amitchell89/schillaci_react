import React, { Component } from 'react';

export default class SignUpForm extends Component {
  render() {

    return (
      <div className="SignUpForm">
        <h2>Join Our Mailing List</h2>
        <form id="contact_form" method="post">
          <div className="form__row">
            <input type="text" name="email" placeholder="Your Email"></input>
          </div>
          <button type="submit" form="email_form" value="Submit" className="btn--outline">Join Now</button>
        </form>
      </div>
    )
  }
}