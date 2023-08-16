import * as React from 'react'

import axios from 'axios'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'
import { Checkbox, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'
import { useParams } from 'react-router-dom'

type Person = {
    firstName: string
    lastName: string
    age: number
    visits: number
    status: string
    progress: number
}

const defaultData: Person[] = [
    {
        firstName: 'tanner',
        lastName: 'linsley',
        age: 24,
        visits: 100,
        status: 'In Relationship',
        progress: 50,
    },
    {
        firstName: 'tandy',
        lastName: 'miller',
        age: 40,
        visits: 40,
        status: 'Single',
        progress: 80,
    },
    {
        firstName: 'joe',
        lastName: 'dirte',
        age: 45,
        visits: 20,
        status: 'Complicated',
        progress: 10,
    },
]

const selectInput = (filterName: string) => {
    switch (filterName){
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
            />
    }
        
}

const columnHelper = createColumnHelper<Person>()

const columns = [
    // columnHelper.accessor('firstName', {
    //     cell: info => info.getValue(),
    //     footer: info => info.column.id,
    // }),
    // columnHelper.accessor(row => row.lastName, {
    //     id: 'lastName',
    //     cell: info => <i>{info.getValue()}</i>,
    //     header: () => <span>Last Name</span>,
    //     footer: info => info.column.id,
    // }),
    // columnHelper.accessor('age', {
    //     header: () => 'Age',
    //     cell: info => info.renderValue(),
    //     footer: info => info.column.id,
    // }),
    
    columnHelper.accessor('status', {
        header: 'Название фильтра',
        
        footer: info => info.column.id,
    }),
    columnHelper.accessor('visits', {
        header: ({ table }) => <Checkbox
        color="primary"
        checked={table.getIsAllRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
    />,
        cell: ({ row }) => <Checkbox
        color="primary"
        checked={row.getIsSelected()}
        onChange={row.getToggleSelectedHandler()}
    />,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('progress', {
        header: 'Значение по умолчанию',
        cell: info => selectInput('text'),
        footer: info => info.column.id,
    }),
]

const ReactTable = () => {

    let { user_id } = useParams()

    const [data, setData] = React.useState(() => [...defaultData])
    const [rowSelection, setRowSelection] = React.useState({})

    const [selectedRowIds, setSelectedRowIds] = React.useState({});
    const selected_rows = Object.keys(rowSelection).map((key) => {
        return data[Number(key)]
    });

    let ob: Record<string, string> = {}

    selected_rows.map(row => {
        ob[row.firstName] = row.firstName
    })

    console.log(ob)
    
    

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
    })

    // const sendData = (data: object) => {
    //     axios.post('profile_filters_add_new_field', {
    //         data: {
    //             if(data.map(row => {
    //                 if(row.checked) {
    //                     send_data.add(row.name: row.value)
    //                 }
    //             }))
    //         }
    //     })
    // }

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

            <pre>{JSON.stringify(table.getState(), null, 2)}</pre>

            <div className="h-4" />
        </div>
    )
}

export default ReactTable;