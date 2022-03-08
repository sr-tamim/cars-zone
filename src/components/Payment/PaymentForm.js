import { Typography } from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React from 'react';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

const PaymentForm = ({ carDetails, snackBar }) => {

    // destructure car details
    const { carName, color } = carDetails ? carDetails : {};

    return (
        <div>
            <Typography variant="h4" color="primary" fontWeight="bold">Place Order</Typography>
            <Typography color="gray" mb={3}>
                {carName} ({color})
            </Typography>
            <Elements stripe={stripePromise}>
                <CheckoutForm carDetails={carDetails} snackBar={snackBar} />
            </Elements>
        </div>
    );
};

export default PaymentForm;