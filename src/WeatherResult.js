import React from 'react';
import './weather.css';
import {
    TableContainer, Table, Paper, TableHead, TableCell, TableRow, TableBody
} from '@mui/material';

function WeatherResult({ weatherData }) {
    function getFormatDate(dateVal) {
        const today = new Date(dateVal);
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${date}/${month}/${year}`;
      }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 1050, margin: 'auto' }} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell align="right">Date</TableCell>
                        <TableCell align="right">Image</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">Min / Max Temperature</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {weatherData.map((item) => (
                        <TableRow
                            key={item.date}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="right">{getFormatDate(item.date)}</TableCell>
                            <TableCell align="right"><img src={item.day.condition.icon} alt=''></img></TableCell>
                            <TableCell align="right">{item.day.condition.text}</TableCell>
                            <TableCell align="right">{item.day.mintemp_c} C° / {item.day.maxtemp_c} C°</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default WeatherResult