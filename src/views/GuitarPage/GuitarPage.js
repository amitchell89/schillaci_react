import React, {Component} from 'react';
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
            <div className="detail">
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
            { name: "description", content: this.props.route.meta.meta_contact },
            { property: "og:title", content: ''},
            { property: "og:url", content: ''},
          ] }
          />
        <h2>
        Guitar Page
        </h2>
        <img src={hero} />
        <p>{data.name}</p>
        <p>{data.about}</p>
        {guitarDetails}
      </div>
    )
  }
}

export default connect(mapStateToProps)(GuitarPage);