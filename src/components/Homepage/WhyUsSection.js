import React from 'react';
import { Box } from '@mui/system';
import { Container, Grid, Typography } from '@mui/material';

// our specialties section
const WhyUsSection = () => {
    return (
        <Box>
            <Typography variant="h4" align="center" color="primary.dark" fontWeight="bold">Guarantee & Limited Warranty</Typography>
            <Container sx={{ my: 6 }}>
                <Grid container rowSpacing={3} columnSpacing={2}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center', m: 2 }}>
                            <Box component="img" src="/images/homepage/24hr-test-drive.svg" sx={{ width: '100px' }} />
                            <Typography variant="h6">
                                24-hour test drives
                            </Typography>
                            <Typography variant="p">
                                With 24 hours to test it out, you can see if the car you want fits you and your life.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center', m: 2 }}>
                            <Box component="img" src="/images/homepage/30day-returns.svg" sx={{ width: '100px' }} />
                            <Typography variant="h6">
                                30-day returns (up to 1500 miles)
                            </Typography>
                            <Typography variant="p">
                                Take a full 30 days or 1500 miles to make sure the one you buy is the one you love.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center', m: 2 }}>
                            <Box component="img" src="/images/homepage/90day.svg" sx={{ width: '100px' }} />
                            <Typography variant="h6">
                                All major systems covered
                            </Typography>
                            <Typography variant="p">
                                You’ll drive worry-free for 90 days or 4,000 miles (whichever comes first).
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default WhyUsSection;