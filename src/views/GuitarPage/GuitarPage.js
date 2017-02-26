import React, {Component} from 'react';
import Helmet from "react-helmet";

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
        Guitar Page
        </h2>
      </div>
    )
  }
}