import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import ReCAPTCHA from "react-recaptcha";

import { addEmail } from '../../store/actions/Email';

function mapStateToProps(state) {
   return {
    isAddEmailPending: state.email.isAddEmailPending,
    isAddEmailSuccess: state.email.isAddEmailSuccess,
    addEmailError: state.email.addEmailError,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addEmail: (data) => {
      dispatch(addEmail(data));
    }
  }
}


class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reCaptchaCode: null
    };
    this.postData = this.postData.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
  }  

  postData(e) {
    e.preventDefault();
    var data = {
      email: this.refs.email.value,
      reCaptchaCode: this.state.reCaptchaCode
    }
    this.props.addEmail(data)
    document.getElementById("email").value = "";
  }


  // specifying your onload callback function
  callback() {
    // console.log('reCaptcha Loaded');
  };
   
  // specifying verify callback function
  verifyCallback(response) {
    this.setState({ reCaptchaCode: response });
  };


  render() {
    const { isAddEmailPending, isAddEmailSuccess, addEmailError } = this.props;

    let statusSuccess = <p className="alert--success">You have successfully signed up! Thank You.</p>;
    let statusError = <p className="alert--error">{addEmailError}</p> 

    return (
      <div className="SignUpForm">
        <h2>Join Our Mailing List</h2>
        <form id="contact_form" method="post">
          <div className="form__row">
            <input id="email" type="text" name="email" placeholder="Your Email" ref="email"></input>
          </div>

          <ReCAPTCHA
            sitekey="6LffPvoUAAAAAAXA6EfFo7Hgknou_GH3rtOHlAyC"
            render="explicit"
            verifyCallback={this.verifyCallback}
            onloadCallback={this.callback}
          />

          <button disabled={!this.state.reCaptchaCode} type="submit" form="email_form" value="Submit" className="btn--outline btn--100" onClick={this.postData.bind(this)}>Sign Up</button>
        </form>
        { isAddEmailSuccess ? statusSuccess : null }
        { addEmailError ? statusError : null }
        <div className="SignUpForm__legal">
          View our <Link to="/privacy">privacy policy</Link> and <Link to="/terms" >terms of service</Link>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);