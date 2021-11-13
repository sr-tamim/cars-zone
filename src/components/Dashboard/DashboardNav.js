import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';
import useAuthContext from '../../others/useAuthContext';

const Icon = styled('i')(({ theme }) => ({
    color: 'inherit', fontSize: '20px'
}));

const LinkWrap = styled(NavLink)(() => ({
    color: 'inherit',
    textDecoration: 'none', '&.active>div': { background: '#ff00000f' }
}))

const DashboardNav = ({ url }) => {
    const { user, logOut } = useAuthContext();
    return (
        <List>
            <LinkWrap exact to={`${url}`} activeClassName='active'>
                <ListItem button>
                    <ListItemIcon><DashboardIcon /></ListItemIcon>
                    <ListItemText>Dashboard</ListItemText>
                </ListItem>
            </LinkWrap>
            {user?.role !== 'admin' &&
                <LinkWrap to={`${url}/pay`} activeClassName='active'>
                    <ListItem button>
                        <ListItemIcon>
                            <Icon className="fas fa-money-check-alt" />
                        </ListItemIcon>
                        <ListItemText>Pay</ListItemText>
                    </ListItem>
                </LinkWrap>
            }
            <LinkWrap to={`${url}/orders`} activeClassName='active'>
                <ListItem button>
                    <ListItemIcon><ShoppingCartIcon /></ListItemIcon>

                    <ListItemText>{user?.role === 'admin' ? 'All Orders' : 'My Orders'}</ListItemText>
                </ListItem>
            </LinkWrap>
            {user?.role !== 'admin' &&
                <LinkWrap to={`${url}/review/add`} activeClassName='active'>
                    <ListItem button>
                        <ListItemIcon><RateReviewIcon /></ListItemIcon>
                        <ListItemText>Review</ListItemText>
                    </ListItem>
                </LinkWrap>
            }
            {user?.role === 'admin' && <>
                <LinkWrap to={`${url}/make_admin`} activeClassName='active'>
                    <ListItem button>
                        <ListItemIcon>
                            <Icon className="fas fa-user-shield" />
                        </ListItemIcon>
                        <ListItemText>Make Admin</ListItemText>
                    </ListItem>
                </LinkWrap>
                <LinkWrap to={`${url}/add_car`} activeClassName='active'>
                    <ListItem button>
                        <ListItemIcon><ElectricCarIcon /></ListItemIcon>
                        <ListItemText>Add Car</ListItemText>
                    </ListItem>
                </LinkWrap>
                <LinkWrap to={`${url}/manage_cars`} activeClassName='active'>
                    <ListItem button>
                        <ListItemIcon>
                            <Icon className="fas fa-tools" />
                        </ListItemIcon>
                        <ListItemText>Manage Cars</ListItemText>
                    </ListItem>
                </LinkWrap>
                <LinkWrap to={`${url}/all_messages`} activeClassName='active'>
                    <ListItem button>
                        <ListItemIcon>
                            <Icon className="far fa-envelope" />
                        </ListItemIcon>
                        <ListItemText>All Messages</ListItemText>
                    </ListItem>
                </LinkWrap>
            </>
            }
            <ListItem button onClick={logOut}>
                <ListItemIcon>
                    <Icon style={{ margin: '0 4px' }} className="fas fa-sign-out-alt" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </ListItem>
        </List>
    );
};

export default DashboardNav;