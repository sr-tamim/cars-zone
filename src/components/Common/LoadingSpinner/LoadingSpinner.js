import { Box } from '@mui/system';
import React from 'react';

const LoadingSpinner = ({ style, width, height }) => {
    return (
        <Box sx={{ ...style, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ width, height }}>
                <Box component="img" src="/images/loading-spinner.svg" sx={{ width: width || '90px', height: height || '90px' }} />
            </Box>
        </Box>
    );
};

export default LoadingSpinner;