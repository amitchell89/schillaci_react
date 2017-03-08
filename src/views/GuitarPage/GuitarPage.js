import React, {Component} from 'react';
import { Link } from 'react-router'
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
    const thisGuitar = this.props.params.guitar;
    const data = guitars[thisGuitar]
    const hero = '../../img/' + data.slider_photo

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