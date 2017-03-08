import React, {Component} from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";
import { Link } from 'react-router';

function mapStateToProps(state) {
   return {
    guitars: state.guitars
  };
}

class Guitars extends Component {
  render() {
    const { guitars } = this.props;

    const guitar_list = guitars.filter(function(n) {
      return n.hidden !== true && n.type === 'guitar';
    });

    const bass_list = guitars.filter(function(n) {
      return n.hidden !== true && n.type === 'bass';
    });

    console.log('check', guitars)

    const guitarThumbs = (
      <div className="guitar__gallery">
        {guitar_list.map(function (s, i) {

          let thumb = '../../img/' + s.thumb_photo;
          let guitar_link = '/guitar/' + i;
          return (
            <Link to={guitar_link}>
              <div className="guitar__thumb">
                <img src={thumb} />
                <div className="guitar__thumb__label">
                  <span className="guitar__thumb__label--name">{s.name}</span>
                  <span className="guitar__thumb__label--price">{s.price}</span>
                </div>
              </div>
            </Link>
          )}.bind(this))}
      </div>
    )

    const bassThumbs = (
      <div className="guitar__gallery">
        {bass_list.map(function (s, i) {

          let thumb = '../../img/' + s.thumb_photo;
          let bass_link = '/guitar/' + i;
          return (
            <Link to={bass_link}>
              <div className="guitar__thumb">
                <img src={thumb} />
                <div className="guitar__thumb__label">
                  <span className="guitar__thumb__label--name">{s.name}</span>
                  <span className="guitar__thumb__label--price">{s.price}</span>
                </div>
              </div>
            </Link>
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
        <div className="guitar__thumb__container">
          <div>{guitarThumbs}</div>
          <div>{bassThumbs}</div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Guitars);