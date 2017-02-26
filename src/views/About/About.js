import React, {Component} from 'react';
import Helmet from "react-helmet";

export default class About extends Component {
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
        About
        </h2>
      </div>
    )
  }
}