import { Box } from '@mui/system';
import { Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import MyModal from '../../Common/Modal/Modal';
import LoadingSpinner from '../../Common/LoadingSpinner/LoadingSpinner';
import useAuthContext from '../../../others/useAuthContext';

// table columns
const columns = [
    { id: 'carID', label: 'Car ID', minWidth: 50 },
    { id: 'carImg', label: 'Thumbnail', minWidth: 50 },
    { id: 'carName', label: 'Car Name', minWidth: 150 },
    { id: 'details', label: 'Car Details (type, color, fuel, engine)', minWidth: 300 },
    { id: 'price', label: 'Price $', align: 'right', minWidth: 80 },
];


const ManageCars = ({ setProcessStatus, showSnackbar }) => {
    const { user } = useAuthContext(); // get user info from user context
    const [modalOpen, setModalOpen] = useState(false); // delete modal state
    const [cars, setCars] = useState(null); // all cars info

    // load all cars info
    useEffect(loadData, [])
    function loadData() {
        axios.get(`https://cars-zone-server.netlify.app/.netlify/functions/server/cars/all`)
            .then(({ data }) => setCars(data))
            .catch(err => console.log(err))
    }


    // deletion process
    const [deletionID, setDeletionID] = useState(null); // carID which have to be deleted
    const handleDelete = (id) => {
        setDeletionID(id); setModalOpen(true); // open delete modal & set delete id
    }
    // delete car from database
    const deleteCarInfo = (id) => {
        axios.delete(`https://cars-zone-server.netlify.app/.netlify/functions/server/cars/${id}`)
            .then(({ data }) => {
                if (data.deletedCount) {
                    loadData();
                    setProcessStatus({ success: 'Deleted Successfully' });
                    showSnackbar()
                }
            })
            .catch(err => {
                loadData(); setProcessStatus({ error: err.message })
                showSnackbar() // show notification popup containing status
            })
    }

    return (!cars ? <LoadingSpinner /> :
        <Box sx={{ height: '100%' }}>
            <Typography variant="h4" align="center" color="primary" fontWeight="bold">Manage All Cars</Typography>
            <Box sx={{ my: 4, position: 'relative', height: '80%' }}>

                {/* all cars info containing table */}
                <TableContainer sx={{ height: '100%', position: 'absolute', top: 0, left: 0 }}>
                    <Table stickyHeader aria-label="Dashboard my orders table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sl no.</TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>

                        {/* table body */}
                        <TableBody>
                            {cars.map((carDetails, index) => {
                                // destructure car info
                                const { carID, carName, carImg, carType, color, fuel, engine, price } = carDetails;
                                return (
                                    <TableRow hover role="checkbox"
                                        sx={{
                                            textTransform: 'capitalize',
                                            '&:nth-of-type(odd)': {
                                                backgroundColor: '#00000012',
                                            },
                                        }}
                                        tabIndex={-1} key={carDetails._id}
                                    >
                                        <TableCell>{index + 1}</TableCell> {/* serial number */}
                                        <TableCell>{carID}</TableCell>      {/* car id */}
                                        {/* car thumbnail image */}
                                        <TableCell>
                                            <Box sx={{
                                                width: '50px', height: '50px',
                                                overflow: 'hidden', display: 'flex', alignItems: 'center', borderRadius: '5px'
                                            }}
                                            >
                                                <img src={carImg} alt={carName} style={{ width: '50px' }} />
                                            </Box>
                                        </TableCell>
                                        <TableCell>{carName}</TableCell>
                                        <TableCell>
                                            {`${carType}, ${color}, ${fuel}, ${engine}`}
                                        </TableCell>
                                        <TableCell align='right'>{price}</TableCell>
                                        <TableCell align="right">
                                            {/* delete button */}
                                            <Button variant="outlined"
                                                onClick={() => handleDelete(carID)} disabled={user?.email === 'demo@admin.srt'}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* delete modal component */}
            <MyModal open={modalOpen} setOpen={setModalOpen}
                confirmedFunction={() => deleteCarInfo(deletionID)}>
                Deleting a car info from database is permanent. This can't be undone
            </MyModal>
        </Box>
    );
};

export default ManageCars;