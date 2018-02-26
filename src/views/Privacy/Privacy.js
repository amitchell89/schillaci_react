import React, {Component} from 'react';
import { Link } from 'react-router';
import Helmet from "react-helmet";

export default class Privacy extends Component {

  render() {
    const { route } = this.props;

    let url = route.meta.site_url;
    let owner = route.meta.site_owner;

    return (
      <div className="Privacy">
        <Helmet
          title={this.props.route.meta.site_name}
          meta={ [
            { name: "description", content: this.props.route.meta.meta_about },
            { property: "og:title", content: ''},
            { property: "og:url", content: ''},
            { property: "og:image", content: ''},
          ] }
        />
        <h1>Privacy Policy</h1>
        <h3>
        Google Analytics
        </h3>
        <p>
        Like millions of other website owners, we use Google Analytics on { url }. Google Analytics is a piece of software that grabs data about visitors to this site. It’s something like an advanced server log. It will record what website you came from to get here and what kind of computer you’re using among other things. The tracking information allows us to better understand the kind of people who come to our site and what content they’re viewing. This allows us to make better decisions about improving this website. Occasionally, we will compile aggregate statistics about the number of visitors this site receives and browsers being used. No personally identifying data is included in this type of reporting. All data collected by Google Analytics is stored and maintained by Google, not us. All of my activity falls within the bounds of the <a href="https://www.google.com/analytics/terms/us.html">Google Analytics Terms of Service.</a>
        </p>
      </div>
    )
  }
}
