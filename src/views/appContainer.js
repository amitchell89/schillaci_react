import React, {Component} from 'react';
import { combineReducers, createStore } from 'redux';
import { connect } from 'react-redux';
import Helmet from "react-helmet";
import Header from './header'
import Footer from './footer'
import Modal from '../components/Modal'

function mapStateToProps(state) {
   return {
    modal: state.modal.display
  };
}

class AppContainer extends Component {

  render() {

    let modal = null;

    if (this.props.modal) {
      modal = (
        <Modal meta={this.props.route.meta}/>
      );
    }

    return (
      <div>
        <Helmet
          meta={[
            { property: "og:site_name", content: 'Site Name Here'},
            { property: "og:type", content: 'website'},
          ]}
        />
        {modal}
        <div className="site_wrapper site_wrapper--main">
          <Header />
          <div className="content_wrapper">
            {this.props.children}
          </div>
          <Footer />
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(AppContainer);
