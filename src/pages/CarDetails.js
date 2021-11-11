import { Button, FormControl, FormHelperText, Grid, Input, InputLabel, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import LoadingSpinner from '../components/Common/LoadingSpinner/LoadingSpinner';
import useAuthContext from '../others/useAuthContext';


const DetailsContainer = styled(Grid)(({ theme }) => ({
    flexDirection: 'column',
    [theme.breakpoints.up('md')]: {
        flexDirection: 'row'
    },
}));


const CarDetails = () => {
    const { user } = useAuthContext();
    const { carID } = useParams();
    const [carDetails, setCarDetails] = useState(null);
    const { carImg, carName, carType, transmission, fuel, color, bodyStyle, mileage, price, engine } = carDetails ? carDetails : {};

    useEffect(() => {
        axios.get(`https://cars-zone.herokuapp.com/cars/details/${carID}`)
            .then(({ data }) => setCarDetails(data))
            .catch(err => console.log(err))
    }, [carID])

    function createData(name, value) {
        return { name, value };
    }

    const rows = [
        createData('body color', color),
        createData('Car Type', carType),
        createData('body style', bodyStyle),
        createData('transmission', transmission),
        createData('Fuel type', fuel),
        createData('engine', engine),
        createData('mileage', `${mileage} km`)
    ];


    // form values
    const [values, setValues] = useState({
        name: user.displayName, email: user.email, phone: '', address: ''
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    // order submission status
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        const { name, phone, address } = values;
        let status = null;
        name === '' ?
            status = { error: 'name is required' } :
            phone === '' ?
                status = { error: 'phone number is required' } :
                !(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g).test(phone) ? status = { error: 'invalid phone number' } :
                    address === '' ?
                        status = { error: 'address is required' } :
                        saveOrderToDB(values, event.target);
        setSubmissionStatus(status)
    }

    // send order info to database
    const saveOrderToDB = (info, form) => {
        const date = Date.now();
        const orderInfo = { ...info, carID, carName, price, date, status: 'pending' }
        axios.post('https://cars-zone.herokuapp.com/order/save', orderInfo)
            .then(({ data }) => {
                data.insertedId && setSubmissionStatus({ success: 'order placed successfully' })
                data.insertedId && setValues({ ...values, name: user.displayName, phone: '', address: '' })
                data.insertedId && form.reset();
            })
            .catch(err => console.log(err))
    }

    return (!carDetails ? <LoadingSpinner /> :
        <Box sx={{ maxWidth: 'xl', mx: 'auto', py: 4, px: 1 }}>
            <DetailsContainer container spacing={2}>
                <Grid item xs={12} md={8}>
                    <Box sx={{
                        height: '500px', background: '#00000011',
                        display: 'flex', justifyContent: 'center',
                        overflow: 'hidden', borderRadius: '10px',
                        '&:hover img': { transform: 'scale(1.1)' }
                    }}>
                        <Box component="img" src={carImg} sx={{
                            height: '100%', transition: 'transform .5s'
                        }} />
                    </Box>
                    <Box>
                        <Typography variant="h4"
                            sx={{
                                fontWeight: 'bold', my: 2
                            }}>{carName}</Typography>
                    </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Typography variant="h4"
                        sx={{
                            fontWeight: 'medium', my: 2
                        }} >Buy this car</Typography>
                    <TableContainer>
                        <Table>
                            <TableBody sx={{ textTransform: 'capitalize', '& th': { fontWeight: 'medium' } }}>
                                {rows.map((row) => (
                                    <TableRow key={row.name}>
                                        <TableCell component="th" scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="right">{row.value}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow sx={{ '& *': { fontSize: '25px', fontWeight: 'bold' } }}>
                                    <TableCell>Price</TableCell>
                                    <TableCell align="right">${price}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box sx={{ my: 8 }}>
                        <Typography variant="h4"
                            sx={{
                                fontWeight: 'medium', my: 2
                            }}>Place Order</Typography>

                        <form style={{ padding: '0 10px' }}
                            onSubmit={handleSubmit}>
                            <FormControl sx={{ my: 1 }} color="primary" variant="standard" fullWidth >
                                <InputLabel htmlFor="full-name">Name</InputLabel>
                                <Input
                                    id="full-name"
                                    type='text'
                                    defaultValue={values.name}
                                    onChange={handleChange('name')}
                                />
                            </FormControl>
                            <FormControl sx={{ my: 1 }} color="primary" variant="standard" fullWidth >
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input
                                    id="email"
                                    type='email'
                                    defaultValue={user.email}
                                    readOnly />
                            </FormControl>
                            <FormControl sx={{ my: 1 }} color="primary" variant="standard" fullWidth >
                                <InputLabel htmlFor="phone">Phone</InputLabel>
                                <Input
                                    id="phone"
                                    type='text'
                                    defaultValue={values.phone}
                                    onChange={handleChange('phone')} />
                            </FormControl>
                            <FormControl sx={{ my: 1 }} color="primary" variant="standard" fullWidth >
                                <InputLabel htmlFor="address">Address</InputLabel>
                                <Input
                                    id="address"
                                    type='text'
                                    defaultValue={values.address}
                                    onChange={handleChange('address')} />
                            </FormControl>

                            <Box sx={{ textTransform: 'capitalize' }}>
                                <FormHelperText sx={{ color: 'red' }}>{submissionStatus?.error}</FormHelperText>
                                <FormHelperText sx={{ color: 'green' }}>{submissionStatus?.success}</FormHelperText>
                            </Box>

                            <Button variant="outlined" size="large" color="primary" type="submit"
                                sx={{ width: '100%', margin: '30px 0' }}>
                                Confirm
                            </Button>
                        </form>
                    </Box>
                </Grid>
            </DetailsContainer>
        </Box>
    );
};

export default CarDetails;