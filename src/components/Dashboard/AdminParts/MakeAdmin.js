import { AccountCircle } from '@mui/icons-material';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React from 'react';
import useAuthContext from '../../../others/useAuthContext';


const MakeAdmin = ({ setProcessStatus, handleSnackBar }) => {
    const { user } = useAuthContext(); // get user info from user context
    const [emailInput, setEmailInput] = React.useState(''); // form email input state


    // add new admin to database
    function addNewAdmin(event) {
        setProcessStatus(null);
        // email validation
        !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(emailInput) ?
            setProcessStatus({ error: 'Invalid Email' })
            : axios.post(`https://cars-zone.herokuapp.com/admin/add`, { email: emailInput })
                .then(({ data }) => {
                    data.modifiedCount ? setProcessStatus({
                        success: 'Admin Added Successfully'
                    })
                        : data.matchedCount && setProcessStatus({ success: 'Already Added' })
                    data.error ? setProcessStatus(data) : event.target.reset();
                })
                .catch(err => console.log(err.message));
        handleSnackBar(); // show notification containing status
        event.preventDefault();
    }


    return (
        <Box>
            <Typography variant="h4" align="center" color="primary" fontWeight="bold">Make A New Admin</Typography>
            <form onSubmit={addNewAdmin}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 3 }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Email" variant="standard"
                        onChange={(e) => setEmailInput(e.target.value)} />
                    <Button sx={{ py: 0.5 }} type="submit"
                        disabled={user?.email === 'demo@admin.srt'}>Add</Button>
                </Box>
            </form>
        </Box>
    );
};

export default MakeAdmin;