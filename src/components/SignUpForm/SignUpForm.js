import React, { Component } from 'react';

export default class SignUpForm extends Component {

  // Need to set email in component state, and handle changes via function
  // http://stackoverflow.com/questions/23427384/get-form-data-in-reactjs

  // handleEmailChange(e) {
  //  this.setState({email: e.target.value});
  //  console.log(this.state.email)
  // }

  // <input type="text" name="email" placeholder="Your Email" ref="email" value={this.state.email} onChange={this.handleEmailChange}></input>


  postData(e) {
    console.log('posting', e.target)
    fetch('/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
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
          <button type="submit" form="email_form" value="Submit" className="btn--outline" onClick={this.postData}>Join Now</button>
        </form>
      </div>
    )
  }
}