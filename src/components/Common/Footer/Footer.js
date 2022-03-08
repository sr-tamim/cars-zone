import { Container, Divider, Grid, Link, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { FacebookRounded, PhoneRounded, Twitter } from '@mui/icons-material';

const Footer = () => {
    return (
        <Box component="footer">
            <Container sx={{ my: 8 }}>
                <Box sx={{
                    display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'
                }}>
                    <Box component="img" src="/images/logo.png" sx={{ width: '200px' }} />
                    <Box sx={{
                        display: 'flex', alignItems: 'flex-end',
                        my: 2, '&>a': {
                            color: 'primary.main', fontSize: '20px', textDecoration: 'none', mx: 1,
                            display: 'flex', alignItems: 'flex-end'
                        }
                    }}>
                        <Box component='a' href="https://facebook.com/srtamim21">
                            <FacebookRounded color="primary" />
                        </Box>
                        <Box component='a' href="https://twitter.com/TaMiM__tamim">
                            <Twitter color="primary" />
                        </Box>
                        <Box component="a" href="tel:+88019028060">
                            <PhoneRounded sx={{ mx: 1 }} />
                            (+880) 1902-8060
                        </Box>
                    </Box>
                </Box>
                <Divider sx={{ my: 3 }} />

                <Grid container rowSpacing={4} columnSpacing={2}>
                    <Grid item xs={6} sm={4} md={3} xl={2} sx={{
                        display: 'flex', flexDirection: 'column',
                        '& > a': { color: '#000000bb' }
                    }}>
                        <Typography variant='h6'>Shop</Typography>
                        <Link href="#">Browse by category</Link>
                        <Link href="#">View all inventory</Link>
                        <Link href="#">Explore all cars</Link>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3} xl={2} sx={{
                        display: 'flex', flexDirection: 'column',
                        '& > a': { color: '#000000bb' }
                    }}>
                        <Typography variant='h6'>Sell/Trade</Typography>
                        <Link href="#">Get a online offer</Link>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3} xl={2} sx={{
                        display: 'flex', flexDirection: 'column',
                        '& > a': { color: '#000000bb' }
                    }}>
                        <Typography variant='h6'>Finance</Typography>
                        <Link href="#">How it works</Link>
                        <Link href="#">Auto finance</Link>
                    </Grid>
                    <Grid item xs={6} sm={4} md={3} xl={2} sx={{
                        display: 'flex', flexDirection: 'column',
                        '& > a': { color: '#000000bb' }
                    }}>
                        <Typography variant='h6'>About</Typography>
                        <Link href="#">About Cars Zone</Link>
                        <Link href="#">Investor relations</Link>
                        <Link href="#">Terms & conditions</Link>
                        <Link href="#">Privacy policy</Link>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} xl={2} sx={{
                        display: 'flex', flexDirection: 'column',
                        '& > a': { color: '#000000bb' }
                    }}>
                        <Typography variant='h6'>More</Typography>
                        <Link href="#">Service & Repairs</Link>
                        <Link href="#">FAQ & support</Link>
                        <Link href="#">Research articles</Link>
                        <Link href="#">Guarantee & warranties</Link>
                    </Grid>
                    <Grid item xs={12} sm={4} md={3} xl={2} sx={{
                        display: 'flex', flexDirection: 'column'
                    }}>
                        <Typography variant='h6'>Copyright</Typography>
                        <Typography variant="p">
                            Copyright © 2021 <br />
                            All rights reserved <br />
                            Programmed, developed & managed by <br />
                            <Link href="https://sr-tamim.vercel.app" color="primary" fontWeight="bold" target="_blank">SR TAMIM</Link>
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Footer;