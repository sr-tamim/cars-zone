import { Typography } from '@mui/material';
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

const columns = [
    { id: 'name', label: 'Name', minWidth: 170 },
    { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
    {
        id: 'population',
        label: 'Population',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'size',
        label: 'Size\u00a0(km\u00b2)',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'density',
        label: 'Density',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2),
    },
];

function createData(name, code, population, size) {
    const density = population / size;
    return { name, code, population, size, density };
}


const DashboardMyOrders = () => {
    const { user } = useAuthContext();
    const [myOrders, setMyOrders] = useState(null);

    useEffect(() => {
        axios.get(`https://cars-zone.herokuapp.com/orders/${user.email}`)
            .then(({ data }) => setMyOrders(data))
            .catch(err => console.log(err))
    }, [user.email])

    const rows = !myOrders ? [] : myOrders.map(order => {
        const { carID, carName, status, date } = order;
        const timeStamp = new Date(date);
        return createData(carID, carName, status, timeStamp.toLocaleDateString())
    })

    return (
        <Box>
            <Typography variant="h4" color="primary"
                sx={{ textAlign: 'center', fontWeight: 'bold' }}>
                My Orders
                <Typography>{user.email}</Typography>
            </Typography>
            <Box>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => {
                                return (
                                    <TableRow hover role="checkbox"
                                        sx={{
                                            '&:nth-of-type(odd)': {
                                                backgroundColor: '#00000012',
                                            },
                                        }}
                                        tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number'
                                                        ? column.format(value)
                                                        : value}
                                                </TableCell>
                                            );
                                        })}
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