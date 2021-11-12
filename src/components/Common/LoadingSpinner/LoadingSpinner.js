import { Box } from '@mui/system';
import React from 'react';

const LoadingSpinner = ({ style, width, height }) => {
    return (
        <Box sx={style}>
            <Box sx={{ textAlign: "center" }}>
                <Box component="img" src="/images/loading-spinner.svg" sx={{ width: width || '100px', height: height || '100px' }} />
            </Box>
        </Box>
    );
};

export default LoadingSpinner;