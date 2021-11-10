import { Box } from '@mui/system';
import React from 'react';

const LoadingSpinner = ({ style }) => {
    return (
        <Box sx={style}>
            <Box sx={{ textAlign: "center", p: 2 }}>
                <Box component="img" src="/images/loading-spinner.svg" />
            </Box>
        </Box>
    );
};

export default LoadingSpinner;