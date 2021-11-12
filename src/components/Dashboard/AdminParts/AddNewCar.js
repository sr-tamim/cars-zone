import { Button, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import axios from 'axios';
import React from 'react';

const Icon = styled('i')(({ theme }) => ({
    color: '#00000099',
    fontSize: '22px', margin: '5px 10px 5px 0'
}));


const AddNewCar = ({ setProcessStatus, handleSnackBar }) => {
    const [values, setValues] = React.useState({})
    const [carType, setCarType] = React.useState('')
    const [fuel, setFuel] = React.useState('')
    const handleValueChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }

    const handleSubmit = (event) => {
        const newCarInfo = { ...values, carType, fuel }
        axios.post('https://cars-zone.herokuapp.com/cars', newCarInfo)
            .then(({ data }) => {
                if (data.insertedId) {
                    setProcessStatus({
                        success: 'New Car Added Successfully'
                    })
                    handleSnackBar()
                    event.target.reset()
                }
            })
            .catch(err => console.log(err))
        event.preventDefault()
    }
    return (
        <Box>
            <Typography variant="h4" align="center" color="primary" fontWeight="bold">Add New Car In Shop</Typography>
            <Box maxWidth="sm" sx={{ my: 4, mx: 'auto' }}>
                <form onSubmit={handleSubmit}>
                    <Grid container rowSpacing={3.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-file-signature"></Icon>
                                <TextField fullWidth label="Car Name"
                                    variant="standard" required type="text"
                                    onChange={handleValueChange('carName')} />
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-palette"></Icon>
                                <TextField fullWidth label="Body Color"
                                    variant="standard" required type="text"
                                    onChange={handleValueChange('color')} />
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-car"></Icon>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel>Car Type</InputLabel>
                                    <Select fullWidth required
                                        value={carType}
                                        onChange={(e) => setCarType(e.target.value)}
                                    >
                                        <MenuItem value={'sport'}>Sport</MenuItem>
                                        <MenuItem value={'sedan'}>Sedan</MenuItem>
                                        <MenuItem value={'coupe'}>Coupe</MenuItem>
                                        <MenuItem value={'suv'}>SUV</MenuItem>
                                        <MenuItem value={'convertible'}>Convertible</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-road"></Icon>
                                <TextField fullWidth required label="Mileage"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">km</InputAdornment>,
                                    }}
                                    variant="standard" type="number"
                                    onChange={handleValueChange('mileage')}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-tachometer-alt"></Icon>
                                <TextField fullWidth label="Transmission"
                                    variant="standard" required text="text"
                                    onChange={handleValueChange('transmission')} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-cogs"></Icon>
                                <TextField fullWidth label="Engine"
                                    variant="standard" required type="text"
                                    onChange={handleValueChange('engine')} />
                            </Box>
                        </Grid>
                        <Grid item xs={5} md={4}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-gas-pump"></Icon>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel>Fuel</InputLabel>
                                    <Select fullWidth required
                                        value={fuel}
                                        onChange={(e) => setFuel(e.target.value)}
                                    >
                                        <MenuItem value={'gasoline'}>Gasoline</MenuItem>
                                        <MenuItem value={'diesel'}>Diesel</MenuItem>
                                        <MenuItem value={'bio-diesel'}>Bio-Diesel</MenuItem>
                                        <MenuItem value={'ethanol'}>Ethanol</MenuItem>
                                        <MenuItem value={'electric'}>Electric</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={7} md={8}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-dollar-sign"></Icon>
                                <TextField fullWidth label="Price"
                                    variant="standard" required type="number"
                                    onChange={handleValueChange('price')} />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-image"></Icon>
                                <TextField fullWidth label="Img URL"
                                    variant="standard" required type="url"
                                    onChange={handleValueChange('carImg')} />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField fullWidth multiline
                                rows={4} sx={{ my: 2 }}
                                label="Description" variant="outlined"
                                type="text" required
                                onChange={handleValueChange('description')} />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'right' }}>
                            <Button type="submit" variant="outlined">Add to Database</Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>

        </Box>
    );
};

export default AddNewCar;