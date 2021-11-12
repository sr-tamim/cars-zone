import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuthContext from '../../others/useAuthContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import LoadingSpinner from '../Common/LoadingSpinner/LoadingSpinner';
import MyModal from '../Common/Modal/Modal';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


const columns = [
    { id: 'carName', label: 'Car\u00a0Name', minWidth: 200 },
    { id: 'carID', label: 'Car\u00a0ID', minWidth: 50, align: 'right' },
    { id: 'price', label: 'Price\u00a0$', align: 'right', minWidth: 80 },
    {
        id: 'date',
        label: 'Date',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'time',
        label: 'Time',
        minWidth: 100,
        align: 'right',
    },
];


const DashboardOrders = ({ setProcessStatus, handleSnackBar }) => {
    const { user } = useAuthContext();
    const [modalOpen, setModalOpen] = useState(false);
    const [orders, setOrders] = useState(null);

    function loadData() {
        axios.get(`https://cars-zone.herokuapp.com/orders/${user.email}`)
            .then(({ data }) => setOrders(data))
            .catch(err => console.log(err))
    }
    useEffect(loadData, [user.email])

    // deletion process
    const [deletionID, setDeletionID] = useState(null);
    const handleDelete = (id) => {
        setDeletionID(id); setModalOpen(true);
    }
    const deleteOrder = (id) => {
        axios.delete(`https://cars-zone.herokuapp.com/order/${id}`)
            .then(({ data }) => {
                if (data.deletedCount) {
                    loadData(); setProcessStatus({
                        success: 'Deleted Successfully'
                    });
                    handleSnackBar()
                }
            })
            .catch(err => console.log(err))
    }

    // set rows of table
    const rows = !orders ? [] : orders.map(order => {
        const { date } = order;
        const dateStamp = new Date(date);
        return {
            ...order,
            date: dateStamp.toLocaleDateString(),
            time: dateStamp.toLocaleTimeString()
        };
    })

    const handleStatusChange = (event, id) => {
        const status = event.target.value;
        axios.put('https://cars-zone.herokuapp.com/order', { id, status })
            .then(({ data }) => {
                if (data.modifiedCount) {
                    loadData(); setProcessStatus({
                        success: 'Status Changed Successfully'
                    });
                    handleSnackBar();
                }
            })
            .catch(err => console.log(err))
    };


    return (!orders ? <LoadingSpinner /> :
        <Box>
            <Typography variant="h4" color="primary"
                align="center" fontWeight='bold'>
                {user?.role === 'admin' ? 'All Orders' : 'My Orders'}
                {user?.role === 'admin' && <Typography>{user.email}</Typography>}
            </Typography>
            <Box sx={{ my: 4 }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="Dashboard my orders table">
                        <TableHead>
                            <TableRow>
                                {user?.role === 'admin' && <TableCell>Email</TableCell>}
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                                <TableCell align="right"
                                    style={{ minWidth: 80 }}
                                >Status</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox"
                                        sx={{
                                            textTransform: 'capitalize',
                                            '&:nth-of-type(odd)': {
                                                backgroundColor: '#00000012',
                                            },
                                        }}
                                        tabIndex={-1} key={row._id}
                                    >
                                        {user?.role === 'admin' && <TableCell sx={{
                                            textTransform: 'none'
                                        }}>{row.email}</TableCell>
                                        }
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}
                                                >{value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align="right" sx={{ pr: 0 }}>
                                            <Select readOnly={user.role !== 'admin'}
                                                variant="standard"
                                                value={row.status}
                                                onChange={(e) => handleStatusChange(e, row._id)}
                                                sx={{
                                                    fontSize: '1em', '&>div': { py: 1, px: 1 },
                                                    '&::before,&::after': { border: 0 },
                                                    '&:hover::before': { border: '0 !important' }
                                                }}
                                            >
                                                <MenuItem value={'pending'}>Pending</MenuItem>
                                                <MenuItem value={'shipped'}>Shipped</MenuItem>
                                                <MenuItem value={'done'}>Done</MenuItem>
                                            </Select>
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button variant="outlined"
                                                onClick={() => handleDelete(row._id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
            <MyModal open={modalOpen} setOpen={setModalOpen}
                confirmedFunction={() => deleteOrder(deletionID)}>
                Confirm your order deletion process. You can't undo this
            </MyModal>
        </Box>
    );
};

export default DashboardOrders;