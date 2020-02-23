import React from 'react';
import { Route, Switch } from 'react-router-dom';
import BackStageLayout from '../views/backView'
import LoginView from '../views/login/login';
import PrivateRoute from '../components/privateRoute/index';

export default () => (
    <Switch>
        <Route exact path="/login" component={LoginView}></Route>
        <PrivateRoute  path="/" component={BackStageLayout}></PrivateRoute>
    </Switch>
)