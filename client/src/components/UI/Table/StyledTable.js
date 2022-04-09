import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';

import { StyledTableRow } from './TableRow/StyledTableRow';
import { StyledTableCell } from './TableCell/StyledTableCell';
import StyledTypography from '../Typography/StyledTypography';

const StyledTable = ({ rowsData, title, tableLabel, headerRow }) => {
  return (
    <div>
      {title && (
        <StyledTypography style={{ variant: 'h5' }}>{title}</StyledTypography>
      )}
      <TableContainer component={Paper}>
        <Table aria-label={tableLabel || ''}>
          <TableHead>
            <StyledTableRow>
              {headerRow.map((headerCell) => (
                <StyledTableCell key={headerCell}>{headerCell}</StyledTableCell>
              ))}
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {rowsData.map((row) => (
              <StyledTableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {Object.keys(row).map((key, index) => {
                  if (key !== 'id') {
                    return <TableCell key={row.id + key}>{row[key]}</TableCell>;
                  }
                  // eslint-disable-next-line array-callback-return
                  return;
                })}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default StyledTable;
