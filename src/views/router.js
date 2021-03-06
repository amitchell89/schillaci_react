import React, {Component} from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

import store from '../store/reducers';
import Home from './Home';
import Guitars from './Guitars';
import GuitarPage from './GuitarPage';
import Necks from './Necks';
import Necks2 from './Necks2';
import About from './About';
import Contact from './Contact';
import AppContainer from './appContainer';
import Privacy from './Privacy';
import Terms from './Terms';
import NotFound from './NotFound';

import * as meta from '../store/constants/meta_info';

import ReactGA from 'react-ga';
ReactGA.initialize(meta.ga_tracking_code);

function fireTracking() {
  ReactGA.pageview(window.location.pathname);
}

export default class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory} onUpdate={fireTracking}>
          <Route path='/' component={AppContainer} meta={meta}>
            <IndexRoute component={Home} meta={meta} />
            <Route path='/guitars' component={Guitars} meta={meta} />
            <Route path='/guitar/(:guitar)' component={GuitarPage} meta={meta} />
            <Route path='/necks' component={Necks2} meta={meta} />
            <Route path='/about' component={About} meta={meta} />
            <Route path='/contact' component={Contact} meta={meta} />
            <Route path='/privacy' component={Privacy} meta={meta} />
            <Route path='/terms' component={Terms} meta={meta} />
            <Route path='*' component={NotFound} meta={meta} />
          </Route>
        </Router>
      </Provider>
    )
  }
}
