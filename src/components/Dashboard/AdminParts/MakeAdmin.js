import { AccountCircle } from '@mui/icons-material';
import { Button, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import useAuthContext from '../../../others/useAuthContext';


const MakeAdmin = ({ setProcessStatus, showSnackbar }) => {
    const { user, updateUserRole } = useAuthContext(); // get user info from user context
    const [emailInput, setEmailInput] = React.useState(''); // form email input state


    // add new admin to database
    function addNewAdmin(event) {
        event.preventDefault();
        // email validation
        if (!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g).test(emailInput)) {
            setProcessStatus({ error: 'Invalid Email' })
            showSnackbar()
            return
        }
        updateUserRole('admin', emailInput)
            .then(status => {
                setProcessStatus(status)
                showSnackbar() // show notification containing status
            })
    }


    return (
        <Box>
            <Typography variant="h4" align="center" color="primary" fontWeight="bold">Make A New Admin</Typography>
            <form onSubmit={addNewAdmin}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', my: 3 }}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" label="Email" variant="standard"
                        onChange={(e) => setEmailInput(e.target.value)} required />
                    <Button sx={{ py: 0.5 }} type="submit"
                        disabled={user?.email === 'demo@admin.srt'}>Add</Button>
                </Box>
            </form>
        </Box>
    );
};

export default MakeAdmin;