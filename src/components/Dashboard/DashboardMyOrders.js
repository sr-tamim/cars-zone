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

const columns = [
    { id: 'carID', label: 'Car\u00a0ID', minWidth: 50 },
    { id: 'carName', label: 'Car\u00a0Name', minWidth: 170 },
    {
        id: 'status',
        label: 'Status',
        minWidth: 100,
        align: 'right',
    },
    {
        id: 'date',
        label: 'Date',
        minWidth: 120,
        align: 'right',
    },
    {
        id: 'time',
        label: 'Time',
        minWidth: 120,
        align: 'right',
    },
];


const DashboardMyOrders = () => {
    const { user } = useAuthContext();
    const [myOrders, setMyOrders] = useState(null);

    function loadData() {
        axios.get(`https://cars-zone.herokuapp.com/orders/${user.email}`)
            .then(({ data }) => setMyOrders(data))
            .catch(err => console.log(err))
    }
    useEffect(loadData, [user.email])

    const deleteOrder = (id) => {
        axios.delete(`https://cars-zone.herokuapp.com/order/${id}`)
            .then(({ data }) => data.deletedCount && loadData())
            .catch(err => console.log(err))
    }

    const rows = !myOrders ? [] : myOrders.map(order => {
        const { date } = order;
        const dateStamp = new Date(date);
        return {
            ...order,
            date: dateStamp.toLocaleDateString(),
            time: dateStamp.toLocaleTimeString()
        };
    })

    return (!myOrders ? <LoadingSpinner /> :
        <Box>
            <Typography variant="h4" color="primary"
                sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                My Orders
                <Typography>{user.email}</Typography>
            </Typography>
            <Box sx={{ my: 4 }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="Dashboard my orders table">
                        <TableHead>
                            <TableRow>
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
                                        tabIndex={-1} key={row._id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}
                                                    sx={{
                                                        color: value === 'pending' ? 'red' : 'inherit'
                                                    }}
                                                >
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                        <TableCell align="right">
                                            <Button variant="outlined"
                                                onClick={() => deleteOrder(row._id)}>Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default DashboardMyOrders;