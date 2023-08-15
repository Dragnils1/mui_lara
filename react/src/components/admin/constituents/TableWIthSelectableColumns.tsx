import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import CheckIcon from '@mui/icons-material/Check';
import { Data } from '../../../types/data';
import { EnhancedTableProps, EnhancedTableToolbarProps, headCells, Order, Tableprops } from '../../../types/table';
import { useSubmitDataMutation,  useSubmitStatusMutation } from '../../../services/goroskop';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
import { Avatar, Button, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '../../../hooks/hooks';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import RestoreFromTrashIcon from '@mui/icons-material/RestoreFromTrash';
import restrictRole from '../../../functions/restrictRole';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import cloneDeep from 'lodash.clonedeep'
import { restrictDate } from '../../../functions/restrictDate';
import { getComparator } from '../../../functions/forTable';
import T from '../../quiz/OnlyText';
import Export from './export';




const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected, nameOfTable } = props;



    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {nameOfTable === 'Линия 1' ? 'Главный модератор' : nameOfTable}
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton size="large">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton size="large">
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};


function EnhancedTableHead(props: EnhancedTableProps) {

    const { order, orderBy, onRequestSort, headCellsProp } = props;

    const HeadCells = headCellsProp ?? headCells

    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    const wideArr = [
    {
        id: 'id',
        label: 'Админу',
    },
    {
        id: 'id',
        label: 'Экспорт',
    },
    {
        id: 'id',
        label: 'На обработку',
    },
    {
        id: 'id',
        label: 'Главному модератору',
    },
    {
        id: 'id',
        label: 'На модерацию',
    },
    {
        id: 'id',
        label: 'Архив',
    },
    {
        id: 'id',
        label: 'Модерация',
    },
    {
        id: 'id',
        label: 'Информация',
    },
    {
        id: 'id',
        label: 'В корзину',
    },
    {
        id: 'id',
        label: 'Удалить',
    }
    ]

    return (
        <TableHead>
            <TableRow>


                {HeadCells.map((headCell) => (
                    <TableCell
                        key={headCell.id + headCell.label}
                        align='left'
                        sx={wideArr.some(el => el.id === headCell.id) ?
                            { maxWidth: '80px', padding: '1px 4px' } : { maxWidth: '20px', padding: '1px 4px' } }
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const EnhancedTableWithSelect: React.FC<Tableprops> = ({ data, nameOfTable, headCellsProp, path_with_params}) => {

    //i used deep clone for changes inside array (it was refs on value merrory, but not clone)

    const [deepCloneData, setDeepCloneData] = React.useState(cloneDeep(data));

    const [order, setOrder] = React.useState<Order>('asc');
    const [date, setDate] = React.useState<string>(nameOfTable === 'Модерация' ?
        (localStorage.getItem('generalDate') ?? '') : '');
    const [orderBy, setOrderBy] = React.useState<keyof Data>("defer");
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [submitData, { }] = useSubmitDataMutation()
    const [sendStat, {}] = useSubmitStatusMutation()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(1000);

    const sendExport = (id?: string, name?: any) => {

        let fD = new FormData();

        id && fD.append('val', id)

        switch (typeof name) {
            case 'object':
                fD.append('obj', name)
                break;
            case 'string':
                fD.append('export', name)
                break;
        }
        submitData({ name: 'export.php', data: fD })

        enqueueSnackbar('Данные успешно обновлены', {
            variant: 'success',
        })
    }

    const updateSetter = (setterName: string, value: string, id: string) => {

        let fD = new FormData();

        fD.append('value', value)
        fD.append('setterName', setterName)
        fD.append('id', id)

        submitData({ name: 'setter.php', data: fD })
    }


    const sendStatus = (id: string, value: string, arr: Data[], ind: number, key?: string,) => {

        let fD = new FormData();
        fD.append('id', id)
        fD.append('status', value)
        key && fD.append('key', key)

        sendStat(fD)

        enqueueSnackbar('Данные успешно обновлены', {
            variant: 'success',
        })

        arr.splice(ind, 1);
        setDeepCloneData(arr);
    }

    const sendData = async (id: string, value: string, name: string) => {


        let fD = new FormData();

        fD.append('id', id)
        fD.append('value', value)
        submitData({ name: name, data: fD })

        enqueueSnackbar('Данные успешно обновлены', {
            variant: 'success',
        })
    }

    const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);

        let fD = new FormData();

        fD.append('obj', JSON.stringify(newSelected))
        submitData({ name: 'export.php', data: fD })
        setSelected(newSelected);

        enqueueSnackbar('Данные успешно обновлены', {
            variant: 'success',
        })
    };

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = deepCloneData.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const memoizedRenderTable = React.useCallback(() => {

        return deepCloneData
            .filter(obj => date ? (+new Date(obj['next_contact_date'] ?? '') <= +new Date(date) ||
                obj['next_contact_date'] === null || obj['next_contact_date'] === '') : true)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .sort(getComparator(order, orderBy))
            .map((row, index, thisArr) => {

                const isItemSelected = isSelected(row.id);

                return (
                    <TableRow
                        hover
                        // onClick={(event) => handleClick(event, row.name)}
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row.id}
                        selected={isItemSelected}
                        sx={row.color ? {
                            backgroundColor: row.color, '& > td': {
                                padding: '1px 4px'
                            }
                        } : {
                            '& > td': {
                                padding: '1px 4px'
                            }
                        }}
                    >
                        <TableCell align="left" >
                            {row.firstname}
                        </TableCell>
                        <TableCell align="left">{row.email}</TableCell>
                        <TableCell align="left">{row.visible_pass}</TableCell>
                        <TableCell align="left" size='small'>
                            <Link to={`../profile/${row.id}`}><EditIcon /></Link>
                        </TableCell>
                    </TableRow>
                );
            })
    }, [data, date, page, rowsPerPage, order, orderBy, selected, deepCloneData])

    let tableRefVariable = memoizedRenderTable()

    const mem = React.useCallback(() => { return (tableRefVariable.length) }, [tableRefVariable.length])


    return (
        <Box >
            <TextField
                id="date-picker"
                label='Выберите дату'
                type="date"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                value={date}
                onChange={(e) => { setDate(e.target.value); localStorage.setItem('generalDate', e.target.value) }}
            />
            <T>Сейчас в работе: {mem()}</T>
            <Paper sx={{ maxWidth: '100%', mb: 2}}>
                <EnhancedTableToolbar numSelected={selected.length} nameOfTable={nameOfTable}/>
                <TableContainer sx={{ maxHeight: '750px' }}>
                    <Table
                        stickyHeader
                        aria-label="sticky dense table"
                        aria-labelledby="tableTitle"
                        size="small"
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={deepCloneData.length}
                            headCellsProp={headCellsProp}
                        />
                        <TableBody  >
                            {tableRefVariable}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{
                                        height: ( 33 ) * emptyRows,
                                    }}
                                >
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[1000, 5, 10, 25]}
                    component="div"
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            <Export path_with_params={path_with_params ?? ''} />

            {/* <Button variant="contained" size="large" onClick={() =>
                    sendExport(undefined, nameOfTable ? nameOfTable : 'moderation')}>
                Экспортировать
            </Button> */}

            {/* <p>
                <Link to="/api/people.csv" target="_blank">Скачать файл</Link>
            </p> */}

        </Box>
    );
}

export default EnhancedTableWithSelect
