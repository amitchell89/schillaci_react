import React, {Component} from 'react';
import Helmet from "react-helmet";
import ContactForm from '../../components/ContactForm'

import ParallaxHero from '../../components/ParallaxHero';

export default class Contact extends Component {
  render() {

    const DesktopHero = "https://blacksquare.nyc3.digitaloceanspaces.com/schillaci-guitars/Hero/schillaci_guitars_contact_hero_desktop.jpg"
    const MobileHero = "https://blacksquare.nyc3.digitaloceanspaces.com/schillaci-guitars/Hero/schillaci_guitars_contact_hero_mobile.jpg"
    return (
      <div>
        <Helmet
          title=""
          meta={ [
            { name: "description", content: this.props.route.meta.meta_contact },
            { property: "og:title", content: 'Schillaci Guitars: Contact'},
            { property: "og:url", content: 'https://schillaciguitars.com/contact'},
            { property: "og:image", content: 'https://schillaciguitars.com/img/' + DesktopHero },
          ] }
          />

        <ParallaxHero 
          desktopImage={DesktopHero}
          mobileImage={MobileHero}
        />
        <div className="Contact">
          <h2>
          Interested in ordering a custom guitar, bass or neck?
          </h2>
          <p>
          Send us a message detailing what you're looking for to receive a quote. Because of the time constraints involved in making each guitar it is best to get in contact as soon as possible so we can determine an adequate schedule for your project.
          </p>
          <ContactForm />
        </div>
      </div>
    )
  }
}