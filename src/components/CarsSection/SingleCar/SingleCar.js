import { Button, Grid, Typography } from '@mui/material';
import { alpha, Box, styled } from '@mui/system';
import React from 'react';
import { NavLink } from 'react-router-dom';


const Icon = styled('i')(({ theme }) => ({
    color: theme.palette.primary.light,
    fontSize: '22px'
}));
const CarPrice = styled('h5')(({ theme }) => ({
    background: alpha(theme.palette.primary.dark, 0.6),
    color: 'white',
    fontSize: '20px',
    margin: '0 0 10px',
    padding: '10px 20px',
    borderRadius: '20px'
}));


const SingleCar = ({ carInfo }) => {
    const { carID, carImg, carName, carType, transmission, fuel, color, mileage, price, engine } = carInfo;
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Box sx={{
                overflow: 'hidden', height: '500px', position: 'relative',
                display: 'flex', alignItems: 'flex-end', '&:hover img': {
                    transform: 'scale(1.1)'
                }, '& .purchase-button-wrap': {
                    position: 'absolute', inset: 0,
                    background: '#ff000044', display: 'none', zIndex: 1,
                    justifyContent: 'center', alignItems: 'center'
                }, '&:hover .purchase-button-wrap': { display: 'flex' }
            }}>
                <Box component="img" src={carImg} sx={{
                    width: '100%', transition: 'transform 800ms'
                }} />
                <Box className="purchase-button-wrap">
                    <NavLink to={`/cars/details/${carID}`} style={{ textDecoration: 'none' }}
                    ><Button variant="contained" color="primary"
                        sx={{ borderRadius: '5px', px: 3.5, py: 1.3 }}
                    >Purchase</Button></NavLink>
                </Box>
                <Box sx={{
                    position: 'absolute', bottom: 0, left: 0, width: '100%',
                    background: 'linear-gradient(#00000000,#00000077,#00000099)',
                    color: 'white',
                    px: 2, pt: 12, pb: 3
                }} >
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Typography variant="h4"
                            sx={{ fontWeight: 'bold', textTransform: 'capitalize' }}
                        >{carName}</Typography>
                        <CarPrice>${price}</CarPrice>
                    </Box>
                    <Box sx={{
                        display: 'flex', flexWrap: 'wrap',
                    }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: 1, mt: 1.5 }}>
                            <Icon className="fas fa-car"></Icon>
                            <Typography variant="p" sx={{ textTransform: 'capitalize', mx: 1 }}>{carType}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: 1, mt: 1.5 }}>
                            <Icon className="fas fa-tachometer-alt"></Icon>
                            <Typography variant="p" sx={{ textTransform: 'capitalize', mx: 1 }}>{transmission}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: 1, mt: 1.5 }}>
                            <Icon className="fas fa-gas-pump"></Icon>
                            <Typography variant="p" sx={{ textTransform: 'capitalize', mx: 1 }}>{fuel}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: 1, mt: 1.5 }}>
                            <Icon className="fas fa-palette"></Icon>
                            <Typography variant="p" sx={{ textTransform: 'capitalize', mx: 1 }}>{color}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: 1, mt: 1.5 }}>
                            <Icon className="fas fa-road"></Icon>
                            <Typography variant="p" sx={{ textTransform: 'capitalize', mx: 1 }}>{mileage}</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: 1, mt: 1.5 }}>
                            <Icon className="fas fa-cogs"></Icon>
                            <Typography variant="p" sx={{ textTransform: 'capitalize', mx: 1 }}>{engine}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default SingleCar;