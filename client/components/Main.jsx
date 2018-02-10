import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import AddCenter from './AddCenter';
import Centers from './Centers';

const Main = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={Signup} />
    <Route path="/centers" component={Centers} />
    <Route path="/add-center" component={AddCenter} />
  </Switch>
);
export default Main;
