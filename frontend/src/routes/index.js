import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Profile from '../pages/Profile';
import Deliveries from '../pages/Deliveries';
import Deliveryman from '../pages/Deliveryman';
import Recipient from '../pages/Recipient';
import Problem from '../pages/Problem';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />

            <Route path="/profile" component={Profile} isPrivate />

            <Route path="/deliveries" component={Deliveries} isPrivate />
            <Route path="/deliveryman" component={Deliveryman} isPrivate />
            <Route path="/recipient" component={Recipient} isPrivate />
            <Route path="/problem" component={Problem} isPrivate />
        </Switch>
    );
}
