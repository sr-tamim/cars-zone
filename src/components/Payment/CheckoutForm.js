import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';
import { Button, FormHelperText, TextField } from '@mui/material';
import axios from 'axios';
import { Box } from '@mui/system';
import LoadingSpinner from '../Common/LoadingSpinner/LoadingSpinner';
import { useHistory } from 'react-router-dom';
import useAuthContext from '../../others/useAuthContext';

const CheckoutForm = ({ carDetails, snackBar }) => {
    const { user } = useAuthContext()

    const [clientSecret, setClientSecret] = React.useState(null)
    const [paymentProcessing, setPaymentProcessing] = React.useState(false)
    const [paymentStatus, setPaymentStatus] = React.useState(null)

    // destructure car details
    const { carID, carName, price } = carDetails ? carDetails : {};


    const history = useHistory()
    const stripe = useStripe()
    const elements = useElements()

    React.useEffect(() => {
        carDetails && axios.post('https://cars-zone-server.netlify.app/.netlify/functions/server/create-payment-intent', carDetails)
            .then(({ data }) => setClientSecret(data))
            .catch(err => console.log(err))
    }, [carDetails, price])


    // form values
    const [values, setValues] = React.useState({
        name: user.displayName, email: user.email, phone: '', address: ''
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleSubmit = async event => {
        event.preventDefault()
        setPaymentProcessing(true)
        setPaymentStatus(null)


        const { name, phone, address } = values;
        const formInfoError = name === '' ? 'name is required' :
            phone === '' ? 'phone number is required' :
                !(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/g).test(phone) ?
                    'invalid phone number' :
                    address === '' ? 'address is required' : null;
        if (formInfoError) {
            setPaymentStatus(formInfoError)
            setPaymentProcessing(false)
            return
        }


        if (!stripe || !elements) return
        const card = elements.getElement(CardElement)
        if (!card) return

        const payLoad = await stripe.createPaymentMethod({ type: 'card', card })

        if (payLoad.error) { setPaymentStatus(payLoad.error.message) }
        else {
            const confirmPayment = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                    billing_details: {
                        name: name,
                        email: user.email,
                        phone: phone, address: address
                    }
                }
            })
            if (confirmPayment.error) { setPaymentStatus(confirmPayment.error.message) }
            else if (confirmPayment?.paymentIntent?.status === 'succeeded') {
                setPaymentStatus(confirmPayment.paymentIntent.status)
                // send order info to database
                const date = Date.now();
                const orderInfo = {
                    carID, carName, price, date,
                    email: user.email, status: 'pending',
                    paymentDetails: confirmPayment?.paymentIntent
                }
                const { setProcessStatus, showSnackbar } = snackBar;
                axios.post('https://cars-zone-server.netlify.app/.netlify/functions/server/order/save', orderInfo)
                    .then(({ data }) => {
                        if (data.insertedId) {
                            setProcessStatus({ success: 'Order Placed Successfully' });
                            showSnackbar() // show notification popup containing status
                            history.push('/dashboard/review/add')
                        }
                    })
                    .catch(err => {
                        setProcessStatus({ error: err?.message })
                        showSnackbar() // show notification popup containing status
                    })
            }
            else { setPaymentStatus(confirmPayment.paymentIntent.status) }
        }
        setPaymentProcessing(false)
    }

    return (
        <>
            <form style={{
                padding: '0 10px', maxWidth: '600px',
                margin: '0 auto'
            }}
                onSubmit={handleSubmit}>
                <Box>
                    <TextField label="Name" variant="standard" color="primary"
                        sx={{ my: 1 }} fullWidth
                        type='text'
                        defaultValue={values.name}
                        onChange={handleChange('name')}
                    />
                    <TextField label="Email" variant="standard" color="primary"
                        sx={{ my: 1 }} fullWidth
                        type='email'
                        value={user.email}
                        readOnly
                    />
                    <TextField label="Phone" variant="standard" type='text' color="primary"
                        sx={{ my: 1 }} fullWidth
                        defaultValue={values.phone}
                        onChange={handleChange('phone')}
                    />
                    <TextField label="Address" variant="standard" type='text' color="primary"
                        sx={{ my: 1 }} fullWidth
                        defaultValue={values.address}
                        onChange={handleChange('address')}
                    />
                </Box>

                <Box sx={{ mt: 3 }}>
                    <CardElement
                        options={{
                            style: {
                                base: {
                                    fontSize: '16px',
                                    color: '#424770',
                                    '::placeholder': {
                                        color: '#aab7c4',
                                    }
                                },
                                invalid: {
                                    color: '#9e2146',
                                },
                            },
                        }}
                    />
                </Box>

                <FormHelperText sx={{ fontSize: 10, mt: 1 }}>
                    For test purpose: apply card number as 4242 4242 4242 4242, write any future date on card expiry date field, write any 3 digit number in CVC field and any 5 digit number in ZIP code field
                </FormHelperText>
                <Box sx={{ textTransform: 'capitalize', mt: 4 }}>
                    <FormHelperText sx={{ textAlign: 'center' }}>{paymentStatus}</FormHelperText>
                </Box>
                <Button variant="outlined" size="large" color="primary" type="submit"
                    disabled={!price || paymentProcessing || paymentStatus === 'succeeded'}
                    sx={{ width: '100%', margin: '30px 0' }}>
                    {
                        !paymentProcessing ? `Pay $${price ? price : ''}` :
                            <LoadingSpinner width="26px" height="26px" style={{ padding: 0 }} />
                    }
                </Button>
            </form>
        </ >
    );
};

export default CheckoutForm;