import { Box } from '@mui/system';
import { Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import LoadingSpinner from '../../Common/LoadingSpinner/LoadingSpinner';

// table columns
const columns = [
    { label: 'Name', minWidth: 100 },
    { label: 'Email', minWidth: 150 },
    { label: 'Message', minWidth: 150 },
    { label: 'Date', align: 'right', minWidth: 100 },
];


const AllMessages = () => {
    const [messages, setMessages] = useState(null); // all messages state

    // load data from server
    useEffect(loadData, [])
    function loadData() {
        axios.get(`https://cars-zone-server.netlify.app/.netlify/functions/server/contact`)
            .then(({ data }) => setMessages(data))
            .catch(err => console.log(err))
    }


    return (!messages ? <LoadingSpinner /> :
        <Box sx={{ height: '100%' }}>
            <Typography variant="h4" align="center" color="primary" fontWeight="bold">Messages
                <Typography>Showing all messages sent via contact form</Typography>
            </Typography>
            <Box sx={{ my: 4, position: 'relative', height: '80%' }}>

                {/* all messages containing table */}
                <TableContainer sx={{ height: '100%', position: 'absolute', top: 0, left: 0 }}>
                    <Table stickyHeader aria-label="Dashboard my orders table">
                        {/* table head */}
                        <TableHead>
                            <TableRow>
                                <TableCell>Sl no.</TableCell>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.label}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        {/* table body */}
                        <TableBody>
                            {messages.map((info, index) => {
                                const { name, email, message, date } = info
                                const dateTime = new Date(date)
                                return (
                                    <TableRow hover role="checkbox"
                                        sx={{
                                            textTransform: 'capitalize',
                                            '&:nth-of-type(odd)': {
                                                backgroundColor: '#00000012',
                                            },
                                        }}
                                        tabIndex={-1} key={info._id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{name}</TableCell>
                                        <TableCell sx={{ textTransform: 'none' }}>{email}</TableCell>
                                        <TableCell>{message}</TableCell>
                                        <TableCell align='right'>{dateTime.toLocaleString()}</TableCell>
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

export default AllMessages;