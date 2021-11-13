import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

// dashboad payment component
const DashboardPay = () => {
    return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
            <Button color="primary" sx={{ px: 4 }}>
                <Typography component="h2" sx={{
                    textTransform: 'capitalize', fontSize: '30px'
                }}>Payment System Coming Soon</Typography>
            </Button>
        </Box>
    );
};

export default DashboardPay;