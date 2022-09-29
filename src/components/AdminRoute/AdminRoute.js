import React from 'react';
import { Redirect, Route } from 'react-router';
import useAuthContext from '../../others/useAuthContext';
import LoadingSpinner from '../Common/LoadingSpinner/LoadingSpinner';

// protect pages only available for admins
const AdminRoute = ({ children, ...rest }) => {
    const { user, loadingUserOnReload, authLoading } = useAuthContext();
    return (
        loadingUserOnReload || authLoading ? <LoadingSpinner /> :
            <Route {...rest} render={({ location }) => user.role === 'admin' ? children :
                <Redirect to={{ pathname: '/unauthorized', state: { from: location } }} />
            } />
    );
};

export default AdminRoute;