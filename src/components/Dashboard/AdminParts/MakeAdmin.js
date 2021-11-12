import { AccountCircle } from '@mui/icons-material';
import { Alert, Button, Snackbar, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import useAuthContext from '../../../others/useAuthContext';


const MakeAdmin = () => {
    const { getUserFromDB } = useAuthContext();
    const [emailInput, setEmailInput] = React.useState('');
    const [addingStatus, setAddingStatus] = React.useState(null);


    // add new admin
    function addNewAdmin(event) {
        event.preventDefault();
        setAddingStatus(null);
        !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(emailInput) ?
            setAddingStatus({ error: 'Invalid Email' })
            : axios.post(`https://cars-zone.herokuapp.com/admin/add`, { email: emailInput })
                .then(({ data }) => {
                    data.modifiedCount ? setAddingStatus({
                        success: 'Admin Added Successfully'
                    })
                        : data.matchedCount && setAddingStatus({ success: 'Already Added' })
                    data.error ? setAddingStatus(data) : event.target.reset();
                })
                .catch(err => console.log(err.message));
        handleClick()
    }


    const [snackBar, setSnackBar] = React.useState(false);
    const handleClick = () => {
        setSnackBar(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackBar(false);
    };


    return (
        <Box>
            <Typography variant="h4" align="center" color="primary" fontWeight="bold">Make A New Admin</Typography>
            <form onSubmit={addNewAdmin}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 3 }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Email" variant="standard"
                        onChange={(e) => setEmailInput(e.target.value)} />
                    <Button sx={{ py: 0.5 }} type="submit">Add</Button>
                </Box>
            </form>
            {addingStatus?.success &&
                <Snackbar open={snackBar} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {addingStatus?.success}
                    </Alert>
                </Snackbar>
            }{addingStatus?.error &&
                <Snackbar open={snackBar} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {addingStatus?.error}
                    </Alert>
                </Snackbar>
            }
        </Box>
    );
};

export default MakeAdmin;