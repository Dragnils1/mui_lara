import * as React from 'react'

import axios from 'axios'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Button, Checkbox, FormControlLabel, Switch, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { useParams } from 'react-router-dom'
import {  FilterColumns } from '../../../types/filter'



interface tableProps {
    filterData: FilterColumns[]
    children?: React.ReactNode
}

const selectInput = (filterName: string, defaultValue: string) => {
    switch (filterName) {
        case 'date':
            return <TextField
                label='Выберите дату'
                type="date"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        case 'range':
            return <> dsa</>
        case 'zodiak':
            return

        default:
            return <TextField
                label='Выберите дату'
                type="text"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                value={defaultValue ?? 'no value'}
            />
    }

}

const columnHelper = createColumnHelper<FilterColumns>()

const columns  = [


    columnHelper.accessor('filter_name', {
        header: 'Название фильтра',

        footer: info => info.column.id,
    }),
    columnHelper.accessor('readonly', {
        header: ({ table }) =>
            <>
                <Checkbox
                    color="primary"
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
                <span>Добавить фильтр</span>
            </>,
        cell: ({ row }) =>
            <Checkbox
                color="primary"
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
            />,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('updated_at', {
        header: ({ table }) =>
            <>
                
                <span>Только для чтения</span>
            </>,
        cell: ({ row }) => <FormControlLabel control={<Switch defaultChecked />} label="Да" />,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('default_value', {
        header: 'Значение по умолчанию',
        cell: ({ row }) => selectInput(row.getValue('filter_type'), row.getValue('default_value')),
        footer: info => info.column.id,
    }),
] 



const ReactTable = ({ filterData }: tableProps) => {

    


    let { user_id } = useParams()

    const [data, setData] = React.useState(() => [...filterData])
    const [rowSelection, setRowSelection] = React.useState({})


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    })

    const [selectedRowIds, setSelectedRowIds] = React.useState({});
    const selected_rows: FilterColumns[] = table.getSelectedRowModel().flatRows.map((row) => {
        // readonly: row.original.updated_at что бы не париться с типами 
        return row.original
    });

    // аlet ob: Record<string, string> = {}

    // selected_rows.map(row => {
    //     ob[row.firstName] = row.firstName
    // })

    console.log(selected_rows)

    const sendData = (send_data: FilterColumns[]) => {
        axios.post(`/profile_actions/${user_id}`, {
            data: send_data,
            _method: 'PUT',
        })
    }

    return (
        <div className="p-2">
            <TableContainer sx={{ maxHeight: '750px' }}>
                <Table
                    stickyHeader
                    aria-label="sticky dense table"
                    aria-labelledby="tableTitle"
                    size="small"
                >
                    <TableHead>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableCell key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Button onClick={() => sendData(selected_rows)} variant="contained">Сохранить фильтры</Button>

            <pre>{JSON.stringify(table.getState(), null, 2)}</pre>

            <div className="h-4" />
        </div>
    )
}

export default ReactTable;