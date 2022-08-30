import { Box } from '@mui/system';
import { Button, Container, FormHelperText, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import useAuthContext from '../others/useAuthContext';

const Contact = () => {
    const { user } = useAuthContext();
    const [values, setValues] = React.useState({
        message: '', name: user.displayName
    });

    const handleChange = (prop) => (event) => {
        setValues({
            ...values, [prop]: event.target.value
        });
    };

    const [submissionStatus, setSubmissionStatus] = useState(null);
    const handleSubmit = (event) => {
        setSubmissionStatus(null);
        const { email } = user;
        const date = Date.now();
        const newMessage = { ...values, email, date };
        axios.post('https://cars-zone-server.netlify.app/.netlify/functions/server/contact', newMessage)
            .then(({ data }) => {
                if (data.insertedId) {
                    setSubmissionStatus({ success: 'Message sent successfully' })
                    setValues({ message: '', name: '' })
                    event.target.reset()
                } else {
                    setSubmissionStatus({ error: 'Error sending message' })
                }
            })
            .catch(err => console.log(err));
        event.preventDefault();
    }
    return (
        <Box>
            <Typography variant="h4" align="center" color="primary" fontWeight="bold">Contact Us</Typography>
            <Container maxWidth='sm' sx={{ my: 4 }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Name" variant="standard"
                        fullWidth type="text" autoComplete="cc-name"
                        value={values.name}
                        onChange={handleChange('name')}
                    />
                    <TextField
                        label="Email" variant="standard"
                        fullWidth aria-readonly
                        value={user.email}
                        type="email" sx={{ my: 3 }}
                    />
                    <TextField
                        label="Write Your Message"
                        multiline fullWidth
                        rows={5} required
                        value={values.message}
                        onChange={handleChange('message')}
                    />

                    <Box sx={{
                        textTransform: 'capitalize',
                        display: 'flex', justifyContent: 'flex-end',
                        alignItems: 'center', my: 4
                    }}>
                        <FormHelperText sx={{ color: 'red' }}>{submissionStatus?.error}</FormHelperText>
                        <FormHelperText sx={{ color: 'green' }}>{submissionStatus?.success}</FormHelperText>
                        <Button variant="contained" size="large" color="primary" type="submit" sx={{ ml: 3 }}>Send
                        </Button>
                    </Box>

                </form>
            </Container>
        </Box>
    );
};

export default Contact;