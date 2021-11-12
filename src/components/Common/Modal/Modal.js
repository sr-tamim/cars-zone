import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import ConfirmModal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500, maxWidth: '90%',
    bgcolor: 'background.paper',
    borderRadius: '10px',
    boxShadow: 24,
    p: 4,
};

const MyModal = ({ children, open, setOpen, confirmedFunction }) => {
    const handleClose = () => setOpen(false);

    const confirmed = () => {
        confirmedFunction(); handleClose();
    }

    return (
        <div>
            <ConfirmModal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Are you sure?
                        </Typography>
                        <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                            {children}
                        </Typography>
                        <Box sx={{ textAlign: 'right', mt: 3 }}>
                            <Button variant="contained"
                                sx={{ mx: 2, px: 3 }}
                                onClick={confirmed}>Confirm</Button>
                            <Button variant="outlined"
                                onClick={handleClose}>Cancel</Button>
                        </Box>
                    </Box>
                </Fade>
            </ConfirmModal>
        </div>
    );
};

export default MyModal;