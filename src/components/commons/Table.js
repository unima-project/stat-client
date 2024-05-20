import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {CommonContext} from "../../App";

const rowsPerPageOptions = [5, 10, 25, 50];

export const CommonTable = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(rowsPerPageOptions[0]);
    const [rows, setRows] = React.useState([]);
    const [columns, setColumns] = React.useState([]);
    const {themeColor, translate} = React.useContext(CommonContext);
    const t = translate.t;

    const columnsMemo = React.useMemo(() => {
        return columns
    }, [columns])

    const setupColumn = (cols) => {
        const columnList = [];

        for (const col in cols) {
            columnList.push({
                id: cols[col].id
                , label: cols[col].label
                , minWidth: cols[col].minWidth
                , visible: cols[col].visible
            })
        }

        setupVisibleColumns(columnList);
    }

    const setupVisibleColumns = (columnList) => {
        setColumns(columnList.filter((column) => {
            return column.visible === true
        }))
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const dataTable = <Paper sx={{width: '100%', overflow: 'hidden'}}>
        <TableContainer sx={{maxHeight: 440}}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columnsMemo.map((column) => {
                            return (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth, backgroundColor: themeColor.primary, color: "white"}}
                                >{t(column.label)}</TableCell>
                            );
                        })}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columnsMemo.map((column) => {
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
        <TablePagination
            rowsPerPageOptions={rowsPerPageOptions}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>

    return {
        dataTable
        , setupColumn
        , setRows
    }
}