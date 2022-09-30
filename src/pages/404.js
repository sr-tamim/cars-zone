import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';

// not found page
const Page404 = () => {
    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            minHeight: '70vh', flexDirection: 'column', py: 10, px: 2
        }}>
            <Typography variant="h3" sx={{
                fontWeight: 'bold', color: '#000000aa', my: 4
            }}>ERROR</Typography>
            <Box component="img" src="/images/404.png" sx={{ maxWidth: '100%' }} />
            <Typography variant="h4" fontSize={35} color="primary" sx={{
                fontWeight: 'medium', my: 3
            }}>PAGE NOT FOUND</Typography>
            <NavLink to="/" style={{ textDecoration: 'none' }}>
                <Button sx={{ px: 4 }}>Go To Homepage</Button></NavLink>
        </Box>
    );
};

export default Page404;