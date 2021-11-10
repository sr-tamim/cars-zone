import { Typography } from '@mui/material';
import React from 'react';
import CarsSection from '../components/CarsSection/CarsSection';

const Home = () => {
    return (
        <div>
            <Typography variant="h2">
                This is homepage
            </Typography>
            <CarsSection dataAmount={6} />
        </div>
    );
};

export default Home;