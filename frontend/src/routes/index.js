import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../pages/SignIn';

import Profile from '../pages/Profile';
import Problem from '../pages/Problem';

import Deliveries from '../pages/Deliveries';
import RegisterDelivery from '../pages/Deliveries/Register';
import EditDelivery from '../pages/Deliveries/Edit';

import Deliveryman from '../pages/Deliveryman';
import RegisterDeliveryman from '../pages/Deliveryman/Register';
import EditDeliveryman from '../pages/Deliveryman/Edit';

import Recipient from '../pages/Recipient';
import RegisterRecipient from '../pages/Recipient/Register';
import EditRecipient from '../pages/Recipient/Edit';

export default function Routes() {
    return (
        <Switch>
            <Route path="/" exact component={SignIn} />

            <Route path="/profile" exact component={Profile} isPrivate />
            <Route path="/problem" exact component={Problem} isPrivate />

            {/* deliveries */}
            <Route path="/deliveries" exact component={Deliveries} isPrivate />
            <Route
                path="/deliveries/register"
                exact
                component={RegisterDelivery}
                isPrivate
            />
            <Route
                path="/deliveries/edit"
                exact
                component={EditDelivery}
                isPrivate
            />
            {/* deliveries */}

            {/* deliveryman */}
            <Route
                path="/deliveryman"
                exact
                component={Deliveryman}
                isPrivate
            />
            <Route
                path="/deliveryman/register"
                exact
                component={RegisterDeliveryman}
                isPrivate
            />
            <Route
                path="/deliveryman/edit"
                exact
                component={EditDeliveryman}
                isPrivate
            />
            {/* deliveryman */}

            {/* recipient */}
            <Route path="/recipient" exact component={Recipient} isPrivate />
            <Route
                path="/recipient/register"
                exact
                component={RegisterRecipient}
                isPrivate
            />
            <Route
                path="/recipient/edit"
                exact
                component={EditRecipient}
                isPrivate
            />
            {/* recipient */}
        </Switch>
    );
}
