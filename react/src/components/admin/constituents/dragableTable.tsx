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
import { EnhancedTableProps, EnhancedTableToolbarProps, headCells, Order, reorderProps, Tableprops } from '../../../types/table';
import { useSubmitDataMutation, useSubmitStatusMutation } from '../../../services/goroskop';
import StarIcon from '@mui/icons-material/Star';
import EditIcon from '@mui/icons-material/Edit';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from 'react-router-dom';
import ArticleIcon from '@mui/icons-material/Article';
import { Avatar, Button, FormControl, Grid, TextField } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useAppDispatch } from '../../../hooks/hooks';
import { setTableSendStatus } from '../../../reducers/tableSlice';
import restrictRole from '../../../functions/restrictRole';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import cloneDeep from 'lodash.clonedeep'
import { SketchPicker } from 'react-color';
import { DragDropContext, Draggable, DraggingStyle, Droppable, DropResult, NotDraggingStyle } from 'react-beautiful-dnd';
import { ColorChangeHandler } from '../../../types/colorPicker';
import PaletteIcon from '@mui/icons-material/Palette';
import T from '../../quiz/OnlyText';


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
                    {nameOfTable}
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};


function EnhancedTableHead(props: EnhancedTableProps) {

    const { order, orderBy, onRequestSort } = props;

    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);

        };

    return (
        <TableHead>
            <TableRow>
                {/* <TableCell
                    align='left'
                    sx={{ maxWidth: '20px', padding: '1px 4px' }}
                >
                    <TableSortLabel>Цвет</TableSortLabel>
                </TableCell> */}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id + headCell.label}
                        align='left'
                        sx={{ maxWidth: '20px', padding: '1px 4px' }}
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

const reorder = ({ list, startIndex, endIndex }: reorderProps) => {

    let copyArray = list.slice();
    const [removed] = copyArray.splice(startIndex, 1);
    copyArray.splice(endIndex, 0, removed);

    return copyArray;
};

const getItemStyle = (isDragging: boolean, draggableStyle: DraggingStyle | NotDraggingStyle | undefined, color: string | null) => ({
    background: isDragging ? "#757ce8" : (color ?? ''),
    ...draggableStyle
});

const getListStyle = (isDraggingOver: boolean) => ({
  background: isDraggingOver ? "#1769aa" : "lightgrey",
  padding: "10px"
});


const DraggableEnhancedTable: React.FC<Tableprops> = ({ data, nameOfTable, profile }) => {

    //i used deep clone for changes inside array (it was refs on value merrory, but not clone)
    const [deepCloneData, setDeepCloneData] = React.useState(cloneDeep(data));

    const [order, setOrder] = React.useState<Order>('asc');
    const [date, setDate] = React.useState<string>(localStorage.getItem('generalDate') ?? '');
    const [orderBy, setOrderBy] = React.useState<keyof Data>("firstname");
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const dispatch = useAppDispatch()
    const [submitData, { }] = useSubmitDataMutation()
    const [favSave, {  }] = useSubmitDataMutation()
    const [sendStat, { }] = useSubmitStatusMutation()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(1000);
    const [colorPicker, setColorPicker] = React.useState<string>('#fff');
    const [profileEmail, setProfileEmail] = React.useState(profile?.email)
    const [Email, setEmail] = React.useState("disksvat@gmail.com")
    const [dragableColor, setdragableColor] = React.useState<any[]>((profile?.dragableColor && (JSON.parse(profile?.dragableColor) )) ?? [])


    const tableRef = React.useRef<any>()
    console.log(tableRef.current && [...tableRef.current && tableRef.current.childNodes[1].children].map((element: any) => {

        return [...element.children].map((el: any) => {

            return (el)
        })
    }));




    const createDraggableColor = (id: string, value: string, nameOfColumn: string) => {

        let newArr = []

        if (dragableColor.length) {
            if (!!dragableColor.find(el => el.id === id)) {

                newArr = [...dragableColor.filter(el => el.id !== id),
                    { ...dragableColor.find(el => el.id === id), id: id, [nameOfColumn]: value }]
            } else {

                newArr = [...dragableColor, { id: id, [nameOfColumn]: value }]
            }

        } else {
            newArr = [{id: id, [nameOfColumn]: value}]
        }

        setdragableColor(newArr)
        updateSetter('dragableColor', JSON.stringify(newArr), profile?.id ?? '')
    }

    function handleEmailChange(value: string): void {
        setEmail(value);
    }

    const handleSubmitForm = (event: any) => {

        let fD = new FormData();

        fD.append('profileEmail', profileEmail ?? '')
        fD.append('mainEmail', Email)
        fD.append('mailBody', `<table class="MuiTable - root MuiTable - stickyHeader css - xn82ks - MuiTable - root" aria-label="sticky dense table" aria-labelledby="tableTitle">` + tableRef.current.innerHTML + "</table>")

        submitData({ name: 'phpMailer.php', data: fD })

        enqueueSnackbar('Данные успешно обновлены', {
            variant: 'success',
        })
    }

    const handleChangeComplete: ColorChangeHandler  = (color, event) => {
        setColorPicker(color.hex);
    };

    const subExport = (e: React.MouseEvent<unknown>, id: string) => {

        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
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
        let fD = new FormData();

        fD.append('obj', JSON.stringify(newSelected))
        submitData({ name: 'export.php', data: fD })
        setSelected(newSelected);

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

    const sendStatus = (id: string, value: string, key?: string) => {

        let fD = new FormData();
        fD.append('id', id)
        fD.append('status', value)
        key && fD.append('key', key)

        sendStat(fD)
        dispatch(setTableSendStatus(id));

        enqueueSnackbar('Данные успешно обновлены', {
            variant: 'success',
        })
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
            const newSelecteds = data.map((n) => n.firstname);
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

    const onDragEnd = (result: DropResult) => {

        if (!result.destination) {
            return;
        }

        let movedItems = reorder({
            list: deepCloneData,
            startIndex: result.source.index,
            endIndex: result.destination.index
        });

        let newFavArr: Array<string> = [];

        movedItems.forEach((el) => {
            newFavArr.push(el.id);
        })

        if (profile) {
            updateSetter('fav', newFavArr.join(), profile.id)
        }

        setDeepCloneData(movedItems);

    };




    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

    const memoizedRenderTable = React.useCallback(() => {

        return deepCloneData
            .filter(obj => date ? (+new Date(obj['next_contact_date'] ?? '') <= +new Date(date) ||
                obj['next_contact_date'] === null || obj['next_contact_date'] === '') : true)
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {

                const isItemSelected = isSelected(row.id);
                const dragableStyle = dragableColor.find(el => el.id === row.id)

                return (
                    <Draggable
                        key={row.id}
                        draggableId={"q-" + row.id}
                        index={index}
                    >
                    {(provided, snapshot) => (
                        <TableRow
                            hover
                            // onClick={(event) => handleClick(event, row.name)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={row.id}
                            selected={isItemSelected}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={{ ...getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style,
                                row.color
                            ) }}

                            // sx={index === 0 ? {
                            //     backgroundColor: 'green'
                            // } : {
                            //     backgroundColor: 'green'
                            // }}
                        >
                            {/* <TableCell align="left" onClick={(e) => {
                                console.log(e.currentTarget);

                                e.currentTarget.parentElement
                                    && (e.currentTarget.parentElement.style.backgroundColor = colorPicker);
                                updateSetter('color', colorPicker, row.id)
                            }}>
                                <PaletteIcon  />
                            </TableCell> */}
                            <TableCell
                                align="left"
                                sx={row.defer !== '0' ? { color: 'orange' } : null}

                            >
                                <CheckIcon onClick={() => sendStatus(row.id, +row.defer ? '0' : '1', 'defer')} />
                            </TableCell>
                            <TableCell
                                padding="checkbox"
                                onClick={(event) => subExport(event, row.id)}
                            >
                                <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                        'aria-labelledby': `enhanced-table-checkbox-${index}`,
                                    }}
                                />
                            </TableCell>
                            <TableCell align="left" sx={{
                                minWidth: '200px'
                            }}>
                                {row.firstname}
                            </TableCell>
                            <TableCell align="left" >{row.birthday}</TableCell>
                            <TableCell align="left" onClick={(e) => {
                                e.currentTarget.parentElement
                                    && (e.currentTarget.style.backgroundColor = colorPicker);
                                createDraggableColor(row.id, colorPicker, 'birthyear')
                                // updateSetter('color', colorPicker, row.id)
                            }} style={dragableStyle && { backgroundColor: dragableStyle.birthyear }}>{row.birthyear}</TableCell>
                            <TableCell align="left" onClick={(e) => {
                                e.currentTarget.parentElement
                                    && (e.currentTarget.style.backgroundColor = colorPicker);
                                createDraggableColor(row.id, colorPicker, 'zodiak')
                                // updateSetter('color', colorPicker, row.id)
                            }} style={dragableStyle && { backgroundColor: dragableStyle.zodiak }}>{row.zodiak}</TableCell>
                            <TableCell align="left" onClick={(e) => {
                                e.currentTarget.parentElement
                                    && (e.currentTarget.style.backgroundColor = colorPicker);
                                createDraggableColor(row.id, colorPicker, 'langlove')
                                // updateSetter('color', colorPicker, row.id)
                            }} style={dragableStyle && { backgroundColor: dragableStyle.langlove }}>{row.langlove}</TableCell>
                            <TableCell align="left" onClick={(e) => {
                                e.currentTarget.parentElement
                                    && (e.currentTarget.style.backgroundColor = colorPicker);
                                createDraggableColor(row.id, colorPicker, 'langlove2')
                                // updateSetter('color', colorPicker, row.id)
                            }} style={dragableStyle && { backgroundColor: dragableStyle.langlove2 }}>{row.langlove2}</TableCell>
                            <TableCell
                                align="left"
                                sx={row.vip !== '0' ? { color: 'orange' } : null}
                                onClick={() => sendStatus(row.id, +row.vip ? '0' : '1', 'vip')}
                            >
                                <StarIcon />
                            </TableCell>
                            <TableCell align="left" size='small'
                                sx={{ minWidth: '125px' }}>
                                {row.phone}
                            </TableCell>
                            <TableCell align="left" size='small'>
                                <a href={row.vk} target='_blank'>
                                    <Avatar
                                        src='/images/vk.svg'
                                        alt='vk img'
                                    />
                                </a>
                            </TableCell>
                            <TableCell align="left" size='small'
                            >
                                <a href={row.vk} target='_blank'>{row.vk}</a>
                            </TableCell>
                            <TableCell align="left" size='small'>
                                <Link to={`../profile/${row.id}`}><EditIcon /></Link>
                            </TableCell>
                            <TableCell align="left" size='small'>
                                <TextField
                                    label='Выберите дату'
                                    type="date"
                                    sx={{ width: 220 }}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    defaultValue={row.next_contact_date ?? ' '}
                                    onChange={(e) => {
                                        console.log(row.next_contact_date);

                                        sendData(row.id, e.target.value.trim(), 'updateNextContactData.php');

                                        row['next_contact_date'] = e.target.value.trim()
                                        console.log(row.next_contact_date);

                                    }}
                                />
                            </TableCell>
                            <TableCell align="left" size='small' onClick={() => sendStatus(row.id, '10', 'status')} >
                                <AccountBoxIcon />
                            </TableCell>
                            <TableCell align="left" size='small' sx={{ color: 'green' }} onClick={() => sendExport(row.id)} >
                                <ArticleIcon />
                            </TableCell>
                            <TableCell align="left" size='small' onClick={() => sendStatus(row.id, '28', 'status')} >
                                <AccountBoxIcon />
                            </TableCell>
                            <TableCell align="left" size='small' onClick={() => sendStatus(row.id, '0', 'status')} >
                                <AccountBoxIcon />
                            </TableCell>

                            <TableCell align="left" size='small' onClick={() => sendStatus(row.id, restrictRole(), 'status')}>
                                <PublishedWithChangesIcon />
                            </TableCell>
                            <TableCell align="left" size='small' onClick={() => sendStatus(row.id, '30', 'status')} >
                                <AccountBoxIcon />
                            </TableCell>
                            <TableCell align="left" size='small' onClick={() => sendStatus(row.id, '0', 'status')} >
                                {row.status === 0 ? "Модератор" : row.status == 10 ? "Администратор" : ""}{[1, 2, 3, 4, 5, 6, 7, 8, 9].indexOf(Number(row.status)) !== -1 ? row.status : ""}
                            </TableCell>
                            <TableCell align="left" size='small'  >
                                инф
                            </TableCell>
                            <TableCell align="left" size='small' onClick={() => sendStatus(row.id, '32', 'status')} >
                                <AccountBoxIcon />
                            </TableCell>
                            <TableCell align="left" size='small' onClick={() => sendStatus(row.id, '-2', 'status')} >
                                <AccountBoxIcon />
                            </TableCell>
                            <TableCell align="left">{row.created_at}</TableCell>
                            <TableCell align="left">{row.last_modify}</TableCell>
                            <TableCell align="left">{row.source_type}</TableCell>
                            <TableCell align="left">{row.source}</TableCell>
                        </TableRow>
                    )}
                    </Draggable>
                );
            })
    }, [data, deepCloneData, date, page, rowsPerPage, order, orderBy, colorPicker, dragableColor])


    return (
        <Box >
            <Paper sx={{ maxWidth: '100%', mb: 2 }}>
                <EnhancedTableToolbar numSelected={selected.length} nameOfTable={nameOfTable} />
                <TableContainer sx={{ maxHeight: '750px' }}>
                    <Table
                        stickyHeader
                        aria-label="sticky dense table"
                        aria-labelledby="tableTitle"
                        size="small"
                        ref={tableRef}
                    >
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={data.length}
                        />
                        <DragDropContext onDragEnd={onDragEnd}>
                            <Droppable droppableId="droppable">
                                {(provided, snapshot) => (
                                    <TableBody
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                        style={getListStyle(snapshot.isDraggingOver)}
                                    >
                                        {memoizedRenderTable()}

                                        {provided.placeholder}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height: (33) * emptyRows,
                                                }}
                                            >
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                )}
                            </Droppable>
                        </DragDropContext>
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


            <Grid container spacing={1} style={{ marginTop: '20px' }}>

                <Grid sm={3} >
                    <T>Выберете цвет для строки таблицы:</T>
                    <SketchPicker color={colorPicker}
                        onChangeComplete={handleChangeComplete}
                        presetColors={['#82EC0D', '#DCF000', '#F30622']}
                    />
                </Grid>

                <Grid sm={3} className="fieldLayoutMT15">
                    <T>Укажите email для отправки таблицы:</T>
                    <FormControl  sx={{
                        '& > div': {
                            margin: '4px',
                        }
                    }}>
                        <TextField

                            id={"Email1"}
                            label={"Почта 1"}
                            name={"Email"}
                            variant="outlined"
                            size={'medium'}
                            value={Email}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => handleEmailChange(e.target.value)}

                        />
                        <TextField

                            id={"Email2"}
                            label={"Почта 2"}
                            name={"Email"}
                            variant="outlined"
                            size={'medium'}
                            value={profileEmail}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            onChange={(e) => setProfileEmail(e.target.value)}

                        />
                        <Button variant="contained" color="primary" onClick={handleSubmitForm}>
                            Отправить
                        </Button>
                    </FormControl>

                </Grid>

            </Grid>
        </Box>
    );
}

export default DraggableEnhancedTable
