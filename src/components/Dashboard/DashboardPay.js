import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import PaymentForm from '../Payment/PaymentForm';

// dashboad payment component
const DashboardPay = ({ setProcessStatus, showSnackbar }) => {
    const { carID } = useParams(); // get car id from url parameter

    const [carDetails, setCarDetails] = React.useState(null);

    React.useEffect(() => {
        axios.get(`https://cars-zone-server.netlify.app/.netlify/functions/server/cars/details/${carID}`)
            .then(({ data }) => setCarDetails(data))
            .catch(err => console.log(err))
    }, [carID])

    return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
            <PaymentForm carDetails={carDetails} snackBar={{ setProcessStatus, showSnackbar }} />
        </Box>
    );
};

export default DashboardPay;