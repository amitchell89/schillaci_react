import React, {Component} from 'react';
import Helmet from "react-helmet";
import ContactForm from '../../components/ContactForm'

import ParallaxHero from '../../components/ParallaxHero';

export default class Contact extends Component {
  render() {

    const hero = 'Guitar_Details/schillaci_guitars_detail_riptide_bass_c_02.jpg'
    return (
      <div>
        <Helmet
          title=""
          meta={ [
            { name: "description", content: this.props.route.meta.meta_contact },
            { property: "og:title", content: 'Schillaci Guitars: Contact'},
            { property: "og:url", content: 'https://schillaciguitars.com/contact'},
            { property: "og:image", content: 'https://schillaciguitars.com/img/' + hero },
          ] }
          />

        <ParallaxHero 
          desktopImage={"../../img/" + hero}
          mobileImage={"../../img/" + hero}
        />

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