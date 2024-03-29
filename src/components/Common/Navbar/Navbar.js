import React from 'react';
import "./Navbar.css";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import { AccountCircle } from '@mui/icons-material';
import { Button, Menu, MenuItem } from '@mui/material';
import { NavLink } from 'react-router-dom';
import useAuthContext from '../../../others/useAuthContext';


const toggleHeaderVisibility = () => {
    document.getElementById('header-links').classList.toggle('show')
}

function changeHeaderOnScroll() {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 150) document.querySelector('header').style.padding = '10px 0'
        else if (window.scrollY < 100) document.querySelector('header').style.padding = '20px 0';
    })
}

const Navbar = () => {
    const { user, logOut } = useAuthContext();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <AppBar position="sticky" sx={{
                background: 'white', boxShadow: 'initial',
                maxHeight: '200px', overflow: 'hidden', transition: '500ms ease'
            }} onLoad={changeHeaderOnScroll}>
                <Toolbar sx={{
                    width: '100%', maxWidth: '1400px', margin: 'auto',
                }}>
                    <NavLink to="/">
                        <Box id='header-logo'>
                            <img src="/images/logo.png" alt="" style={{ width: '100%' }} />
                        </Box>
                    </NavLink>
                    <Box id="header-menu-toggler">
                        <IconButton size="large" edge="start"
                            aria-label="open drawer"
                            onClick={toggleHeaderVisibility}>
                            <MenuIcon color="primary" />
                        </IconButton>
                    </Box>
                    <Box noWrap id="header-links" >
                        <NavLink to="/" exact
                            activeClassName="active"
                            onClick={toggleHeaderVisibility}>
                            <Typography variant="h6">Home</Typography>
                        </NavLink>
                        <NavLink to="/cars" activeClassName="active"
                            onClick={toggleHeaderVisibility}>
                            <Typography variant="h6">Explore</Typography>
                        </NavLink>
                        <NavLink to="/contact" activeClassName="active"
                            onClick={toggleHeaderVisibility}>
                            <Typography variant="h6">Contact</Typography>
                        </NavLink>
                        {user && <NavLink to="/dashboard" activeClassName="active"
                            onClick={toggleHeaderVisibility}>
                            <Typography variant="h6">Dashboard</Typography>
                        </NavLink>}

                        {!user ?
                            <NavLink to="/auth/login">
                                <Button variant="contained"
                                    onClick={toggleHeaderVisibility}>Login</Button>
                            </NavLink> :
                            <div>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    sx={{ padding: '5px', margin: 0 }}
                                >
                                    {!user.photoURL ? <AccountCircle color="primary" fontSize="large" /> :
                                        <Box sx={{ width: '30px', height: '30px', background: '#ff000055', borderRadius: '50%', overflow: 'hidden' }}>
                                            <img src={user.photoURL} alt="" style={{ width: '100%' }} />
                                        </Box>}
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}>
                                    <NavLink to="/profile" style={{
                                        textDecoration: 'none', color: 'inherit'
                                    }} >
                                        <MenuItem sx={{ px: 4 }}
                                            onClick={() => { handleClose(); toggleHeaderVisibility() }}
                                        >Profile
                                        </MenuItem>
                                    </NavLink>
                                    <MenuItem sx={{ px: 4 }}
                                        onClick={() => { handleClose(); logOut() }}>Logout</MenuItem>
                                </Menu>
                            </div>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;