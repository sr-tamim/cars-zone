import { Button } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';
import CarsSection from '../components/CarsSection/CarsSection';
import GuaranteeSection from '../components/Homepage/GuaranteeSection';

const Home = () => {
    return (
        <div>
            <section>
                <CarsSection dataAmount={6} />
                <Box sx={{ textAlign: 'center', my: 6 }}>
                    <NavLink to="/cars"
                        style={{ textDecoration: 'none' }}>
                        <Button variant="outlined" color="primary"
                            sx={{
                                px: 4, py: 1.5, fontSize: '20px',
                                borderRadius: '5px'
                            }}
                        >View More</Button></NavLink>
                </Box>
            </section>
            <section>
                <GuaranteeSection />
            </section>
        </div>
    );
};

export default Home;