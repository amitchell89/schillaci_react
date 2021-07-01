import React, {Component} from 'react';
import { Link } from 'react-router';
import Helmet from "react-helmet";
import ReactGA from 'react-ga';

import ParallaxHero from '../../components/ParallaxHero';
import ContactCallout from '../../components/ContactCallout';
import ExtendedContactForm from '../../components/ExtendedContactForm';

export default class Necks2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      hasSeenForm: false,
      hasClickedFixedCTA: false,
      viewport: window.innerWidth
    };
  } 

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, true);
    window.addEventListener('resize', this.handleResize, true);
    this.handleScroll();
    this.handleResize();
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    this.setState({
      viewport: window.innerWidth
    })
    this.handleScroll(); // Fire this on resize to make sure we're hiding the button when needed 
  }

  handleScroll = () => {
    var scroll = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Check if form is in view
    var element = document.getElementById("necks-form");
    var elementInView = this.isElementInViewport(element);

    // Fire Event when form is viewed. Only once. 
    if (elementInView === true && this.state.hasSeenForm === false) {
      this.handleEventSawOrderForm();
    }

    // Hide button when form is in view and page is mobile
    if (elementInView === false && this.state.viewport < 415) {
      document.getElementById('fixed__button').style.display = "block";
    } else {
      document.getElementById('fixed__button').style.display = "none";
    }
    
  }

  isElementInViewport = (el) => {
    var rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) /* or $(window).height() */
    );
  }

  // Fire GA event when user sees order form in viewport. Only allow it to fire once
  handleEventSawOrderForm = () => {

    ReactGA.event({
      category: 'UXMetric',
      action: 'SawOrderForm',
    });

    this.setState({
      hasSeenForm: true
    });

  }

  // Fire GA event when user clicks fixed CTA. Only allow it to fire once
  handleEventClickNecksFixedCTA = () => {

    if (this.state.hasClickedFixedCTA === false) {

      ReactGA.event({
        category: 'UXMetric',
        action: 'ClickNecksFixedCTA',
      });

      this.setState({
        hasClickedFixedCTA: true
      });

    }

  }

  render() {
    const hero = 'schillaci_guitars_custom_necks.jpg';
    return (
      <div>
        <Helmet
          title=""
          meta={ [
            { name: "description", content: this.props.route.meta.meta_necks },
            { property: "og:title", content: 'Schillaci Guitars: Custom Made Necks.'},
            { property: "og:url", content: 'https://schillaciguitars.com/necks'},
            { property: "og:image", content: 'https://schillaciguitars.com/img/' + hero },
          ] }
          />

        <div id="fixed__button">
          <a href="#necks-form">
            <button onClick={this.handleEventClickNecksFixedCTA}>Get a quote on a custom neck</button>
          </a>
        </div>  

        <ParallaxHero 
          desktopImage={"https://blacksquare.nyc3.digitaloceanspaces.com/schillaci-guitars/Necks/" + hero}
          mobileImage={"https://blacksquare.nyc3.digitaloceanspaces.com/schillaci-guitars/Necks/" + hero}
        />

        <div className="necks__info">
          <h1>Custom Classic and Microtonal Necks</h1>
          <h3>Over 20 years of experience building premium, high quality necks and custom guitars</h3>
          <p>
          Classic and microtonal designs for guitar and bass. All necks are made to order in vintage or modern design and built to fit standard guitars.
          </p>
          <div className="button--desktop-only">
            <a href="#necks-form">
              <button className="btn--outline">Order a custom neck</button>
            </a>
          </div>

        </div>
        <div>

          <div className="neck-container">
            <h4><span className="new-callout">NEW</span>Quarter Tone Microtonal Neck</h4>
    
            <img className="necks__img" src="https://blacksquare.nyc3.digitaloceanspaces.com/schillaci-guitars/Necks/schillaci_guitars_quarter_tone_microtonal_neck_rosewood.jpg" />
            <p className="neck-callout">
              Due to popular demand, Schillaci Guitars is now producing quarter tone microtonal necks, the same style used by King Gizzard and The Lizard Wizard. <b>Quartertone Microtonal Necks start at $395 + Shipping & handling.</b> &nbsp;<a href="#necks-form"><b>Order a microtonal neck</b></a>
            </p>
          </div>

          <div className="neck-container">
            <h4>Classic Right Handed Neck</h4>
            <img className="necks__img" src="https://blacksquare.nyc3.digitaloceanspaces.com/schillaci-guitars/Necks/schillaci_guitars_neck_right_handed.png" />
          </div>

          <div className="neck-container">
            <h4>19 Tone Equal Neck</h4>
            <img className="necks__img" src="https://blacksquare.nyc3.digitaloceanspaces.com/schillaci-guitars/Necks/schillaci_guitars_microtonal_neck_19_tone.png" />
          </div>

          <div className="neck-container">
            <h4>31 Tone Equal Neck</h4>
            <img className="necks__img" src="https://blacksquare.nyc3.digitaloceanspaces.com/schillaci-guitars/Necks/schillaci_guitars_microtonal_neck_31_tone.png" />
          </div>

          <div className="neck-container">
            <h4>Fretless Neck</h4>
            <img className="necks__img" src="https://blacksquare.nyc3.digitaloceanspaces.com/schillaci-guitars/Necks/schillaci_guitars_neck_fretless.png" />
          </div>

          <div>
            <h3>Schillaci also makes fully customized guitars</h3>
            <p>When you order from Schillaci Guitars, you are guaranteed to receive a one of a kind instrument, built exactly to your precise needs and taste. <Link to="/guitars">Explore past custom guitar commissions</Link></p>
            <Link to="/guitar/2">
              <img className="necks__img" src="https://blacksquare.nyc3.digitaloceanspaces.com/schillaci-guitars/Slider/schillaci_guitars_02_full_LP_Junior.jpg" />
            </Link>
          </div>

        </div>

        <div id="necks-form">
          <ExtendedContactForm />
        </div>
        
        <div className="necks__fan center">
          <img className="necks__img necks__img--fan" src="https://blacksquare.nyc3.digitaloceanspaces.com/schillaci-guitars/Necks/schillaci_guitars_neck_fan.jpg" />
        </div>
      </div>
    )
  }
}


// Schillaci Guitars is a manufacturer and seller of custom necks including classic and microtonal designs for guitar and bass. All necks are made to order in vintage or modern design and are available in one piece maple construction or maple with rosewood slab board. Darren Schillaci has been building necks for over 25 years and microtonal necks for over 20. Schillaci Guitars provide a precision and quality unparalled in the custom neck industry. 
