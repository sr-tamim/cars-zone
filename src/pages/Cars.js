import { Box } from '@mui/system';
import React from 'react';
import { PageHeading } from '../App';
import CarsSection from '../components/CarsSection/CarsSection';
import Typewriter from 'typewriter-effect';

const Cars = () => {
    return (
        <>
            <Box variant="div" sx={{
                display: 'flex',
                alignItems: 'center',
                maxHeight: '300px',
                overflow: 'hidden',
                position: 'relative'
            }}>
                <img src="/images/cars-page-banner.jpg" alt="cars"
                    style={{ width: '100%' }} />

                <Box
                    sx={{
                        position: 'absolute', bottom: 0, left: 0, width: '100%', color: 'white'
                    }}
                >

                    <PageHeading>Get {' '}
                        <Typewriter
                            options={{ loop: true }}
                            onInit={(typewriter) => {
                                typewriter.typeString('Your Favorite')
                                    .pauseFor(2500).deleteChars(13)
                                    .typeString('Fastest').pauseFor(2000)
                                    .deleteChars(7)
                                    .typeString('Hyper').pauseFor(2000)
                                    .deleteChars(5)
                                    .typeString('Hyper').pauseFor(2000)
                                    .deleteChars(5).pauseFor(1500)
                                    .typeString('Sports').pauseFor(2000)
                                    .deleteChars(6).start()
                            }}
                        /> Cars
                    </PageHeading>
                </Box>
            </Box>
            <CarsSection />
        </>
    );
};

export default Cars;