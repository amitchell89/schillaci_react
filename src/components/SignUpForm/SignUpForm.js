import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

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
    this.postData = this.postData.bind(this);
  }  

  // The reCAPTCHA that used to guard this form was retired by Google and had
  // not actually been running since 2023. The server rate limits this endpoint
  // instead - see src/api/rateLimit.js.
  postData(e) {
    e.preventDefault();

    this.props.addEmail({ email: this.refs.email.value });
    document.getElementById("email").value = "";
  }

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

          <button disabled={isAddEmailPending} type="submit" form="email_form" value="Submit" className="btn--outline btn--100" onClick={this.postData}>Sign Up</button>
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
