import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { styled } from '@mui/system';
import { NavLink } from 'react-router-dom';

const Icon = styled('i')(({ theme }) => ({
    color: 'inherit', fontSize: '20px'
}));

const LinkWrap = styled(NavLink)(() => ({
    textDecoration: 'none', '&.active>div': { background: '#ff00000f' }
}))

const DashboardNav = ({ url }) => {
    return (
        <List>
            <ListItem button>
                <ListItemIcon><DashboardIcon /></ListItemIcon>
                <ListItemText>Dashboard</ListItemText>
            </ListItem>
            <LinkWrap to={`${url}/pay`} activeClassName='active'>
                <ListItem button>
                    <ListItemIcon>
                        <Icon className="fas fa-money-check-alt" />
                    </ListItemIcon>
                    <ListItemText>Pay</ListItemText>
                </ListItem>
            </LinkWrap>
            <LinkWrap to={`${url}/myorders`} activeClassName='active'>
                <ListItem button>
                    <ListItemIcon><ShoppingCartIcon /></ListItemIcon>
                    <ListItemText>My Orders</ListItemText>
                </ListItem>
            </LinkWrap>
            <ListItem button>
                <ListItemIcon><RateReviewIcon /></ListItemIcon>
                <ListItemText>Review</ListItemText>
            </ListItem>
            <ListItem button>
                <ListItemIcon>
                    <Icon style={{ margin: '0 4px' }} className="fas fa-sign-out-alt" />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
            </ListItem>
        </List>
    );
};

export default DashboardNav;