import { AccountCircle } from '@mui/icons-material';
import { Button } from '@mui/material';
import { Box, styled } from '@mui/system';
import React from 'react';
import useAuthContext from '../others/useAuthContext';

const UserProfile = () => {
    const { user, logOut } = useAuthContext();

    const Name = styled('h3')(({ theme }) => ({
        fontWeight: 'bold',
        fontSize: '28px',
        margin: 0,
        textTransform: 'capitalize',
        [theme.breakpoints.up('md')]: {
            fontSize: '45px'
        },
    }));
    const Email = styled('h5')(({ theme }) => ({
        color: theme.palette.primary.main,
        fontWeight: 'normal',
        fontSize: '16px',
        margin: 0,
        [theme.breakpoints.up('md')]: {
            fontSize: '22px'
        },
    }));

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px 10px' }}>
            <Box>
                {!user.photoURL ? <AccountCircle color="primary" sx={{ fontSize: '120px' }} /> :
                    <Box component="img" src={user.photoURL} alt="" sx={{
                        width: '150px', borderRadius: '50%'
                    }} />}
            </Box>
            <Box sx={{ margin: '30px 0', textAlign: 'center' }}>
                <Name>{user.displayName}</Name>
                <Email>{user.email}</Email>
            </Box>
            <Button variant="outlined" onClick={logOut}>Sign out</Button>
        </Box>
    );
};

export default UserProfile;