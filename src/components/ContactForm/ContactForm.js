import React, { Component } from 'react';

export default class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupAlert: false,
      alertStatus: null,
    };
  }  

  postData(e) {
    e.preventDefault();
    console.log('attempting send')
    let name = this.refs.name.value;
    let email = this.refs.email.value;
    let message = this.refs.message.value;
    const parseJson = function (response) {
        return response.json();
    };
    fetch('/contact', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message
      })
    }).then(function(response) {
      this.triggerAlert(response)
    }.bind(this));
  }

  triggerAlert(response) {
    this.setState({ signupAlert: true, alertStatus: response.status })
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  }

  render() {
    const { signupAlert, alertStatus } = this.state;
    return (
      <div>
        <form id="contact_form">
          <div className="form__row">
            <label>Your Name:</label>
            <input ref="name" id="name" type="text" name="name" placeholder="Your Name"></input>
          </div>
          <div className="form__row">
            <label>Your Email Address:</label>
            <input ref="email" id="email" type="text" name="email" placeholder="Your Email"></input>
          </div>
          <div className="form__row">
            <label>Your Message:</label>
            <textarea ref="message" id="message" type="text" name="message" placeholder="Your Message" rows="7"></textarea>
          </div>
          <button onClick={this.postData.bind(this)} type="submit" form="contact_form" value="Submit" className="contact__btn btn--outline">Send Message</button>
        </form>
        { signupAlert 
          ? 
          alertStatus === 200 
            ? <p className="alert--success">Your message has been sent! Thank You.</p> 
            : <p className="alert--error">We're sorry, there was an error sending your message.</p> 
          : null
        }
      </div>
    )
  }
}