import React, { Component } from 'react';

export default class SignUpForm extends Component {

  postData(e) {
    let email = this.refs.email.value;
    fetch('/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email
      })
    })
  }

  render() {

    return (
      <div className="SignUpForm">
        <h2>Join Our Mailing List</h2>
        <form id="contact_form" method="post">
          <div className="form__row">
            <input type="text" name="email" placeholder="Your Email" ref="email"></input>
          </div>
          <button type="submit" form="email_form" value="Submit" className="btn--outline" onClick={this.postData.bind(this)}>Join Now</button>
        </form>
      </div>
    )
  }
}