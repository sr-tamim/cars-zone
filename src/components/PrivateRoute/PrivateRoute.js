import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuthContext from '../../others/useAuthContext';
import LoadingSpinner from '../Common/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, loadingUserOnReload } = useAuthContext();
    return (
        loadingUserOnReload ? <LoadingSpinner /> :
            <Route {...rest} render={({ location }) => user ? children :
                <Redirect to={{ pathname: '/auth', state: { from: location } }} />
            } />
    );
};

export default PrivateRoute;