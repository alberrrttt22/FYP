// src/router/AppRouter.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from '../App';
import GameModes from '/pages/GameModes';

const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/GameModes.jsx" component={GameModes} />
      </Switch>
    </Router>
  );
};

export default AppRouter;