import React, {Component} from 'react';
import Helmet from "react-helmet";
import ContactForm from '../../components/ContactForm'
import { Parallax } from 'react-parallax';

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

        <Parallax className="hero" bgImage="../../img/Guitar_Details/schillaci_guitars_detail_riptide_bass_c_02.jpg" strength={400}>
        </Parallax>

        <h2>
        Interested in ordering a guitar or neck?
        </h2>
        <p>
        Because of the time constraints involved in making each guitar it is best to get in contact as soon as possible so we can determine an adequate schedule for your project.
        </p>
        <ContactForm />
      </div>
    )
  }
}