import React, { Component } from 'react';

export default class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupAlert: false,
      alertStatus: null,
      alertMessage: null,
    };
  }  

  postData(e) {
    e.preventDefault();
    let name = this.refs.name.value;
    let email = this.refs.email.value;
    let message = this.refs.message.value;
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
      // The server always answers with JSON, but never let a bad body swallow
      // the status - that is how this form spent months reporting false success.
      return response.json()
        .catch(function() { return {}; })
        .then(function(body) {
          this.triggerAlert(response.status, body.message);
        }.bind(this));
    }.bind(this)).catch(function() {
      this.triggerAlert(0, null);
    }.bind(this));
  }

  triggerAlert(status, message) {
    const didSend = status === 200;

    this.setState({
      signupAlert: true,
      alertStatus: status,
      alertMessage: message || (didSend
        ? 'Your message has been sent! Thank You.'
        : "We're sorry, there was an error sending your message.")
    });

    // Only clear the form once the message is actually on its way, so a failure
    // does not throw away what the visitor typed.
    if (didSend) {
      document.getElementById("name").value = "";
      document.getElementById("email").value = "";
      document.getElementById("message").value = "";
    }
  }

  render() {
    const { signupAlert, alertStatus, alertMessage } = this.state;
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
            ? <p className="alert--success">{alertMessage}</p> 
            : <p className="alert--error">{alertMessage}</p> 
          : null
        }
      </div>
    )
  }
}
