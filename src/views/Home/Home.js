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
        <p>Home Page</p>
        <ModalButton />
      </div>
    )
  }
}
