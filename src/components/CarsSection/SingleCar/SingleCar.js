import { Grid, Typography } from '@mui/material';
import { alpha, Box, styled } from '@mui/system';
import React from 'react';


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
    const { carImg, carName, carType, transmission, fuel, color, bodyStyle, mileage, price, engine } = carInfo;
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Box sx={{
                overflow: 'hidden', height: '500px', position: 'relative',
                display: 'flex', alignItems: 'flex-end'
            }}>
                <Box component="img" src={carImg} sx={{
                    width: '100%',
                }} ></Box>
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
                        <Box sx={{ display: 'flex', alignItems: 'center', mx: 1, mt: 1.5 }}>
                            <Icon className="fas fa-tint"></Icon>
                            <Typography variant="p" sx={{ textTransform: 'capitalize', mx: 1 }}>{bodyStyle}</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Grid>
    );
};

export default SingleCar;