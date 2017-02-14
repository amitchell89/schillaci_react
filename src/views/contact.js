import React, {Component} from 'react';
import Helmet from "react-helmet";
import ContactForm from '../components/ContactForm'

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
        <ContactForm />
      </div>
    )
  }
}