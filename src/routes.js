import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Main from './containers/Main/index';
import AppContainer from '@containers/AppContainer';

export default function () {

  return (
    <AppContainer>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </AppContainer>
  )
}

function NotFound() {
  return (
    <div className="vh-100 d-flex justify-content-center align-items-center">
      <div className="text-center">
        <h4 className="text-secondary">Page Not Found!</h4>
        <Link to="/">Home</Link>
      </div>
    </div>
  )
}