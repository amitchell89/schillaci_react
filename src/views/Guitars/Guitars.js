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
      </div>
    )
  }
}

export default connect(mapStateToProps)(Guitars);