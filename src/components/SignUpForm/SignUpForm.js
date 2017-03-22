import React, { Component } from 'react';

export default class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupAlert: false,
      alertStatus: null,
    };
  }  

  postData(e) {
    e.preventDefault();
    let email = this.refs.email.value;
    const parseJson = function (response) {
        return response.json();
    };
    fetch('/email', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email
      })
    }).then(function(response) {
      this.triggerAlert(response)
    }.bind(this));
  }

  triggerAlert(response) {
    this.setState({ signupAlert: true, alertStatus: response.status })
    document.getElementById("email").value = "";
  }


  render() {
    const { signupAlert, alertStatus } = this.state;
    return (
      <div className="SignUpForm">
        <h2>Join Our Mailing List</h2>
        <form id="contact_form" method="post">
          <div className="form__row">
            <input id="email" type="text" name="email" placeholder="Your Email" ref="email"></input>
          </div>
          <button type="submit" form="email_form" value="Submit" className="btn--outline" onClick={this.postData.bind(this)}>Join Now</button>
        </form>
        { signupAlert 
          ? 
          alertStatus === 200 
            ? <p className="alert--success">You have successfully signed up! Thank You.</p> 
            : <p className="alert--error">We're sorry, there was an error submitting your email.</p> 
          : null
        }
      </div>
    )
  }
}