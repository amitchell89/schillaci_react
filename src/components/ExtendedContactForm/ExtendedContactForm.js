import React, { Component } from 'react';

export default class ExtendedContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signupAlert: false,
      alertStatus: null,
      name: null,
      email: null,
      message: null,
      project: null,
      instrument: null,
      fretboard: null,
      neckStyle: "Microtonal Quarter Tone",
    };
    this.handleChange = this.handleChange.bind(this);
  } 

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  } 

  postData(e) {
    e.preventDefault();
    // let name = this.refs.name.value;
    // let email = this.refs.email.value;
    // let message = this.refs.message.value;

    let { name, email, message, project, instrument, fretboard, neckStyle } = this.state;

    let projectInfo = `<br />Project type: ${project} <br />Instrument type: ${instrument} <br />Neck Style: ${neckStyle} <br />Fretboard: ${fretboard}`;

    message = `${projectInfo} <br /><br />Customer's message: ${message}`


    const parseJson = function (response) {
        return response.json();
    };

    console.log('name: ', name, '\nemail: ', email, '\nmessage: ', message)

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
        <form id="extended_contact_form">

          <div className="extended_contact_form__headline">
            <img src="https://blacksquare.nyc3.digitaloceanspaces.com/schillaci-guitars/Logos/schillaci_s_logo_blue.png" />
            <h2>Ready to order a custom guitar or neck? Fill out our inquiry form to get a quote and discuss your project.</h2> 
          </div>


          <div className="form__row">
            <label>Your Name:</label>
            <input 
              ref="name" 
              id="name" 
              type="text" 
              name="name" 
              placeholder="Your Name"
              onChange={this.handleChange}
            >
            </input>
          </div>

          <div className="form__row">
            <label>Your Email Address:</label>
            <input 
              ref="email" 
              id="email" 
              type="text" 
              name="email" 
              placeholder="Your Email"
              onChange={this.handleChange}
            >
            </input>
          </div>

          <div className="form__row">
            <label>What are you interested in?</label>
            <span className="radio-container">
              <input 
                type="radio" 
                id="project" 
                name="project" 
                value="Custom Neck"
                onChange={this.handleChange}
              /> 
              <span className="radio-label">Custom Neck</span>
            </span>
            <span className="radio-container">
              <input 
                type="radio" 
                id="project" 
                name="project" 
                value="Custom Guitar"
                onChange={this.handleChange}
              /> 
              <span className="radio-label">Custom Guitar</span>
            </span>
          </div>

          <div className="form__row">
            <label>What type of instrument?</label>
            <span className="radio-container">
              <input 
                type="radio" 
                id="instrument" 
                name="instrument" 
                value="Guitar"
                onChange={this.handleChange}
              /> 
              <span className="radio-label">Guitar</span>
            </span>
            <span className="radio-container">
              <input 
                type="radio" 
                id="instrument" 
                name="instrument" 
                value="Bass"
                onChange={this.handleChange}
              /> 
              <span className="radio-label">Bass</span>
            </span>
          </div>

          <div className="form__row">
            <label>What type of fretboard?</label>
            <span className="radio-container">
              <input 
                type="radio" 
                id="fretboard" 
                name="fretboard" 
                value="Maple"
                onChange={this.handleChange}
              /> 
              <span className="radio-label">Maple</span>
            </span>
            <span className="radio-container">
              <input 
                type="radio" 
                id="fretboard" 
                name="fretboard" 
                value="Rosewood"
                onChange={this.handleChange}
              /> 
              <span className="radio-label">Rosewood</span>
            </span>
          </div>

          <div className="form__row">
            <label>What neck style?</label>
            <select 
              id="neckStyle" 
              name="neckStyle"
              onChange={this.handleChange}
            >
              <option value="Microtonal Quarter Tone">Quarter Tone Microtonal</option>
              <option value="Classic">Classic</option>
              <option value="Microtonal 19">19 Tone Microtonal</option>
              <option value="Microtonal 31">31 Tone Microtonal</option>
              <option value="Fretless">Fretless</option>
            </select>
          </div>

          <div className="form__row">
            <label>Tell us more about your project!</label>
            <textarea 
              ref="message" 
              id="message" 
              type="text" 
              name="message" 
              placeholder="Your Message" 
              rows="7"
              onChange={this.handleChange}
            >
            </textarea>
          </div>

          <button onClick={this.postData.bind(this)} type="submit" form="extended_contact_form" value="Submit" className="contact__btn">Send Message</button>
        
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