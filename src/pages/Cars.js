import { Box } from '@mui/system';
import React from 'react';
import { PageHeading } from '../App';
import CarsSection from '../components/CarsSection/CarsSection';

const Cars = () => {
    return (
        <>
            <Box variant="div" sx={{
                display: 'flex',
                alignItems: 'center',
                maxHeight: '500px',
                overflow: 'hidden',
            }}>
                <img src="/images/cars-page-banner.jpg" alt="cars"
                    style={{ width: '100%' }} />
            </Box>
            <PageHeading>Find Your Favorite Car</PageHeading>
            <CarsSection />
        </>
    );
};

export default Cars;