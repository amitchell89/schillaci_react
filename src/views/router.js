import React, {Component} from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, Link, IndexRoute, hashHistory, browserHistory } from 'react-router'

// import store from '../store/reducers';
// import AppContainer from './appContainer'
// import NotFound from './notFound'
// import * as meta from '../store/constants/meta_info'

export default class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>test</div>
      // <Provider store={store}>
      //   <Router history={browserHistory}>
      //     <Route path='/' component={AppContainer} meta={meta}>
      //       <IndexRoute component={About} meta={meta} />
      //       <Route path='*' component={NotFound} meta={meta} />
      //     </Route>
      //   </Router>
      // </Provider>
    )
  }
}
