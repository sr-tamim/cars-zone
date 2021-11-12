import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../Common/LoadingSpinner/LoadingSpinner';
import SingleCar from './SingleCar/SingleCar';

const CarsSection = ({ dataAmount }) => {
    const [cars, setCars] = useState(null);

    useEffect(() => {
        axios.get(`https://cars-zone.herokuapp.com/cars/${dataAmount ? dataAmount : 'all'}`)
            .then(({ data }) => setCars(data))
            .catch(err => console.log(err));
    }, [dataAmount])


    return (!cars ? <LoadingSpinner style={{ padding: '100px 0' }} /> :
        <Box sx={{ maxWidth: 'xl', mx: 'auto', p: 2 }}>
            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3, xl: 4 }}
                sx={{ justifyContent: 'center' }}>
                {
                    cars.map(carInfo => <SingleCar carInfo={carInfo} key={carInfo.carID} />)
                }
            </Grid>
        </Box>
    );
};

export default CarsSection;