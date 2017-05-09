import React, {Component} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from "react-helmet";

function mapStateToProps(state) {
   return {
    guitars: state.guitars
  };
}

class GuitarPage extends Component {
  render() {

    var { guitars} = this.props;
    const guitarId = parseInt(this.props.params.guitar);

    let data = guitars.filter(function(n) {
      return n.id === guitarId;
    })[0];

    const hero = '../../img/' + data.slider_photo;

    const guitarAbout = (
      <div className="guitarPage__about">
        {data.about.map(function (s, i) {
          return (
            <p className="guitarPage__about__item">
              {s}
            </p>
          )}.bind(this))}
      </div>
    )

    const guitarDetails = (
      <div className="guitarPage__details">
        {data.detail_photos.map(function (s, i) {
          let detail = '../../img/' + s;
          return (
            <div className="guitarPage__detail">
              <img src={detail} />
            </div>
          )}.bind(this))}
      </div>
    )

    return (
      <div>
        <Helmet
          title=""
          meta={ [
            { name: "description", content: this.props.route.meta.meta_standard + ' ' + data.name },
            { property: "og:title", content: 'Schillaci Guitars: ' + data.name },
            { property: "og:url", content: 'https://schillaciguitars.com/' + guitarId},
          ] }
          />
        <img className="guitarPage__hero" src={hero} />
        <div className="guitarPage__name">
          <p>{data.name} &nbsp;|&nbsp; {data.price}</p>
          <Link to="/contact">
            <button className="btn--outline btn--small">Order Guitar</button>
          </Link>
        </div>
        {guitarAbout}
        {guitarDetails}
      </div>
    )
  }
}

export default connect(mapStateToProps)(GuitarPage);