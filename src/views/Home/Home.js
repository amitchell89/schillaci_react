import React, {Component} from 'react';
import { Link } from 'react-router'
import Helmet from "react-helmet";
import ModalButton from '../../components/ModalButton'

export default class Home extends Component {
  render() {
    return (
      <div>
        <Helmet
          title="Page Title"
          meta={ [
            { name: "description", content: this.props.route.meta.meta_about },
            { property: "og:title", content: ''},
            { property: "og:url", content: ''},
            { property: "og:image", content: ''},
          ] }
        />
        <div className="home__hero"></div>
        <div className="home__testimonial">
          <h3>"I'm blown away by this guitar. I can feel the rock solid construction and the neck is amazing. Thank you so much for your craftsmanship and for working with me on this idea."</h3>
          <p>- Adam Krichmar, Satisifed Customer</p>
        </div>
      </div>
    )
  }
}
