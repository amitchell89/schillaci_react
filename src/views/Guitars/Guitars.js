import React, {Component} from 'react';
import { connect } from 'react-redux';
import Helmet from "react-helmet";


function mapStateToProps(state) {
   return {
    guitars: state.guitars
  };
}

class Guitars extends Component {
  render() {
    var { guitars } = this.props;

    // guitars = guitars.filter(function(n) {
    //   return n.hidden !== true;
    // });

    console.log('check', guitars)

    const guitarThumbs = (
      <div className="guitar__gallery">
        {guitars.map(function (s, i) {

          let thumb = '../../img/' + s.thumb_photo;
          return (
            <div className="guitar__thumb">
              <img src={thumb} />
              <p>{s.name}</p>
            </div>
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
        <h2>
        Guitars
        </h2>
        {guitarThumbs}
      </div>
    )
  }
}

export default connect(mapStateToProps)(Guitars);