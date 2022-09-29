import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { Box, Drawer, Button, CssBaseline, Toolbar, Typography, Divider, IconButton, Alert, Snackbar } from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardNav from '../components/Dashboard/DashboardNav';
import { BrowserRouter, Switch, Route, useRouteMatch, NavLink, useHistory } from 'react-router-dom';
import DashboardPay from '../components/Dashboard/DashboardPay';
import DashboardOrders from '../components/Dashboard/DashboardOrders';
import DashboardReview from '../components/Dashboard/DashboardReview';
import MakeAdmin from '../components/Dashboard/AdminParts/MakeAdmin';
import AdminRoute from '../components/AdminRoute/AdminRoute';
import AddNewCar from '../components/Dashboard/AdminParts/AddNewCar';
import ManageCars from '../components/Dashboard/AdminParts/ManageCars';
import useAuthContext from '../others/useAuthContext';
import AllMessages from '../components/Dashboard/AdminParts/AllMessages';

// styled component for font awesome icon
const Icon = styled('i')(({ theme }) => ({
    color: 'inherit', fontSize: '20px'
}));

// styled component for react router NavLink
const LinkWrap = styled(NavLink)(() => ({
    color: 'inherit', textDecoration: 'none',
    '& > button': { margin: '7px 0', padding: '10px 30px', fontSize: '20px', textTransform: 'none' }
}))

const drawerWidth = 240; // dashboard navigation drawer width

// drawer header styled component
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


const Dashboard = () => {
    const { user, loginEmail, logOut } = useAuthContext(); // get user info & log out function

    // material ui theme
    const theme = useTheme();

    const [open, setOpen] = useState(true); // drawer open state
    const [isMobile, setIsMobile] = useState(false); // device state for responsive ui

    // working status state
    const [processStatus, setProcessStatus] = React.useState(null);

    // drawer opening and closing functions
    const handleDrawerOpen = () => setOpen(true)
    const handleDrawerClose = () => setOpen(false)

    // change mobile state depending on window width
    function changeMobileState() {
        window.innerWidth < 600 && setIsMobile(true)
        window.innerWidth < 600 && setOpen(false)
    }
    useEffect(changeMobileState, [])
    window.addEventListener('resize', changeMobileState)

    // styled components
    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
            flexGrow: 1,
            padding: `${theme.spacing(6)} ${theme.spacing(3)}`,
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            marginLeft: isMobile ? 0 : `-${drawerWidth}px`,
            ...(open && {
                transition: theme.transitions.create('margin', {
                    easing: theme.transitions.easing.easeOut,
                    duration: theme.transitions.duration.enteringScreen,
                }),
                marginLeft: 0
            }),
        }),
    );

    const AppBar = styled(MuiAppBar, {
        shouldForwardProp: (prop) => prop !== 'open',
    })(({ theme, open }) => ({
        padding: '10px 0', zIndex: 10,
        background: '#ff00000f', color: theme.palette.primary.dark,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        ...(open && {
            width: isMobile ? '100%' : `calc(100% - ${drawerWidth}px)`,
            marginLeft: isMobile ? 0 : `${drawerWidth}px`,
            transition: theme.transitions.create(['margin', 'width'], {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
        }),
    }));

    // nested routing
    const { path, url } = useRouteMatch();
    const history = useHistory();

    // notification snack bar state
    const [snackBar, setSnackBar] = React.useState(false);

    // handle notification snack bar opening and closing
    const showSnackbar = () => setSnackBar(true)
    const closeSnackbar = (event, reason) => {
        if (reason === 'clickaway') { return }
        setSnackBar(false);
    };


    return (
        // nested react routing
        <BrowserRouter>
            <Box sx={{ display: 'flex', position: 'relative', minHeight: '80vh' }}>
                <CssBaseline />
                <AppBar position="absolute" elevation={1} open={open}>
                    {/* top toolbar */}
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        ><Icon className="fas fa-chevron-right"></Icon>
                        </IconButton>
                        <Typography variant="h6" component="div">
                            Dashboard
                            {user?.email === 'demo@admin.srt' && <Typography variant="small" color="gray"
                             sx={{ fontSize: '0.7rem' }} component="div">
                                All buttons will be disabled because you're just a demo admin
                            </Typography>}
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* navigation drawer */}
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        }, '& > div': { position: 'absolute', zIndex: 10 }
                    }}
                    variant={isMobile ? "temporary" : "persistent"}
                    anchor="left"
                    open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <DashboardNav url={url} />
                </Drawer>

                {/* main part of dashboard */}
                <Main open={open}>
                    <DrawerHeader />
                    <Box sx={{ height: '100%' }}>
                        <Switch>
                            {/* dashboard home */}
                            <Route exact path={path}>
                                <Box sx={{
                                    display: 'flex', alignItems: 'center', flexDirection: 'column'
                                }}>{
                                        user.role === 'admin' ? <>
                                            <LinkWrap to={`${url}/orders`}>
                                                <Button>Manage All Orders</Button>
                                            </LinkWrap>
                                            <LinkWrap to={`${url}/make_admin`}>
                                                <Button>Add new admin</Button>
                                            </LinkWrap>
                                            <LinkWrap to={`${url}/add_car`}>
                                                <Button>Add new car in shop</Button>
                                            </LinkWrap>
                                            <LinkWrap to={`${url}/manage_cars`}>
                                                <Button>Manage all added cars</Button>
                                            </LinkWrap>
                                        </> : <>
                                            <LinkWrap to={`${url}/orders`}>
                                                <Button>Manage my orders</Button>
                                            </LinkWrap>
                                            <LinkWrap to={`${url}/review`}>
                                                <Button>Write a review</Button>
                                            </LinkWrap>
                                            <Button onClick={() => history.push('/profile')}
                                                sx={{ my: '7px', padding: '10px 30px', fontSize: '20px', textTransform: 'none' }}
                                            >View my profile</Button>
                                            <Button onClick={() => loginEmail('demo@admin.srt', '456789')}
                                                sx={{ my: '7px', padding: '10px 30px', fontSize: '20px', textTransform: 'none' }}
                                            >View admin functionalities</Button>
                                        </>
                                    }
                                    <Button sx={{ px: 6, fontSize: '20px', my: 1.5, textTransform: 'none' }}
                                        onClick={logOut}>Sign Out</Button>
                                </Box>
                            </Route>

                            {/* different routes */}
                            <Route path={`${path}/pay/:carID`}>
                                <DashboardPay setProcessStatus={setProcessStatus} showSnackbar={showSnackbar} />
                            </Route>
                            <Route path={`${path}/orders`}>
                                <DashboardOrders setProcessStatus={setProcessStatus} showSnackbar={showSnackbar} />
                            </Route>
                            <Route path={`${path}/review/add`}><DashboardReview /></Route>

                            {/* admin routes */}
                            <AdminRoute path={`${path}/make_admin`}>
                                <MakeAdmin setProcessStatus={setProcessStatus} showSnackbar={showSnackbar} />
                            </AdminRoute>
                            <AdminRoute path={`${path}/add_car`}>
                                <AddNewCar setProcessStatus={setProcessStatus} showSnackbar={showSnackbar} />
                            </AdminRoute>
                            <AdminRoute path={`${path}/manage_cars`}>
                                <ManageCars setProcessStatus={setProcessStatus} showSnackbar={showSnackbar} />
                            </AdminRoute>
                            <AdminRoute path={`${path}/all_messages`}>
                                <AllMessages />
                            </AdminRoute>
                        </Switch>
                    </Box>
                </Main>
            </Box>

            {/* notification snackbar for successful status */}
            {processStatus?.success &&
                <Snackbar open={snackBar} autoHideDuration={5000} onClose={closeSnackbar}>
                    <Alert onClose={closeSnackbar} severity="success" sx={{ width: '100%' }}>
                        {processStatus?.success}
                    </Alert>
                </Snackbar>
            }

            {/* notification snack bar for error status */}
            {processStatus?.error &&
                <Snackbar open={snackBar} autoHideDuration={5000} onClose={closeSnackbar}>
                    <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
                        {processStatus?.error}
                    </Alert>
                </Snackbar>
            }
        </BrowserRouter>
    );
};

export default Dashboard;