import { Button, Container, FormHelperText, Rating, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useState } from 'react';
import useAuthContext from '../../others/useAuthContext';

// add a new review component
const DashboardReview = () => {
    const { user } = useAuthContext(); // get user info from context api

    // save form values in state
    const [values, setValues] = React.useState({
        rating: 5, review: ''
    });
    // handle form input change
    const handleChange = (prop) => (event) => {
        setValues({
            ...values,
            [prop]: prop === 'rating' ? parseInt(event.target.value)
                : event.target.value
        });
    };

    // review sending status state
    const [submissionStatus, setSubmissionStatus] = useState(null);
    // send review to database
    const handleSubmit = (event) => {
        setSubmissionStatus(null);
        const { email, displayName, photoURL } = user;
        const date = Date.now(); // get date information
        const review = { ...values, email, displayName, photoURL, date }; // compress info in object
        axios.post('https://cars-zone-server.netlify.app/.netlify/functions/server/review', review)
            .then(({ data }) => {
                if (data.insertedId) {
                    setSubmissionStatus({ success: 'Review added successfully' })
                    setValues({ review: '', rating: 5 })
                    event.target.reset()
                }
                else { setSubmissionStatus({ error: 'Review not added' }) }
            })
            .catch(err => setSubmissionStatus({ error: err.message }))
        event.preventDefault();
    }
    return (
        <Box>
            <Typography variant="h4" align="center" color="primary" fontWeight="bold">Add a Review</Typography>
            <Container maxWidth='sm' sx={{ my: 2 }}>

                {/* add rating */}
                <Typography align='center'>
                    <Rating onChange={handleChange('rating')}
                        defaultValue={5} size="large" sx={{ my: 3 }} />
                </Typography>

                {/* write review form */}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Write Your Review"
                        multiline fullWidth
                        rows={5} required
                        value={values.review}
                        onChange={handleChange('review')}
                    />

                    {/* show review sending status on ui */}
                    <Box sx={{ textTransform: 'capitalize' }}>
                        <FormHelperText sx={{ color: 'red' }}>{submissionStatus?.error}</FormHelperText>
                        <FormHelperText sx={{ color: 'green' }}>{submissionStatus?.success}</FormHelperText>
                    </Box>

                    <Button variant="contained" size="large" color="primary" type="submit" fullWidth
                        sx={{ my: 4, px: 4, ml: 'auto' }}>Send
                    </Button>
                </form>
            </Container>
        </Box>
    );
};

export default DashboardReview;