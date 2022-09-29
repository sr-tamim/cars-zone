import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuthContext from '../../others/useAuthContext';
import LoadingSpinner from '../Common/LoadingSpinner/LoadingSpinner';

const PrivateRoute = ({ children, ...rest }) => {
    const { user, loadingUserOnReload, authLoading } = useAuthContext();
    return (
        loadingUserOnReload || authLoading ? <LoadingSpinner style={{ py: 8 }} /> :
            <Route {...rest} render={({ location }) => user ? children :
                <Redirect to={{ pathname: '/auth', state: { from: location } }} />
            } />
    );
};

export default PrivateRoute;