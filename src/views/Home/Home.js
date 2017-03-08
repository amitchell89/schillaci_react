import React, {Component} from 'react';
import { Link } from 'react-router'
import Helmet from "react-helmet";
import ModalButton from '../../components/ModalButton'
import GuitarSlider from '../../components/GuitarSlider'
import { Parallax } from 'react-parallax';

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

        <Parallax
          className="hero"
          bgImage="../../img/Guitar_Details/schillaci_guitars_detail_lsg_guitar_04.jpg"
          strength={400}
        >
        </Parallax>

        <div className="home__testimonial">
          <h2>"I'm blown away by this guitar. I can feel the rock solid construction and the neck is amazing. Thank you so much for your craftsmanship and for working with me on this idea."</h2>
          <p>- Adam Krichmar, Satisifed Customer</p>
        </div>
        <GuitarSlider />
      </div>
    )
  }
}
