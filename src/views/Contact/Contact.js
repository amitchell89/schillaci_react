import React, {Component} from 'react';
import Helmet from "react-helmet";
import ExtendedContactForm from '../../components/ExtendedContactForm';


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
          <ExtendedContactForm />
        </div>
      </div>
    )
  }
}