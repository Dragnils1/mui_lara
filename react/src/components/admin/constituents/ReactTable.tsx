import * as React from 'react'

import axios from 'axios'
import {
    CellContext,
    CoreRow,
    RowData,
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

declare module '@tanstack/react-table' {
    interface TableMeta<TData extends RowData> {
      updateData: (rowIndex: number, columnId: string, value: unknown) => void
    }
  }


const editableInput = (row_arg: CellContext<FilterColumns, string>) => {

    const { getValue, row, column: { id }, table } = row_arg
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(row.index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    // return (
    //   <input
    //     value={value as string}
    //     onChange={e => setValue(e.target.value)}
    //     onBlur={onBlur}
    //   />
    // )

    switch (row.getValue('filter_type')) {
        case 'date':
            return <TextField
                label='Выберите дату'
                type="date"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                value={value as string}
                onChange={e => setValue(e.target.value)}
                onBlur={onBlur}
            />
        case 'range':
            return <> dsa</>
        case 'zodiak':
            return

        default:
            return <TextField
                label='Ввeдите текст'
                type="text"
                sx={{ width: 220 }}
                InputLabelProps={{
                    shrink: true,
                }}
                value={value as string}
                onChange={e => setValue(e.target.value)}
                onBlur={onBlur}
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
    columnHelper.accessor('filter_type', {
        header: ({ table }) =>
            <>
                <span>Только для чтения</span>
            </>,
        cell: ({ row }) => <FormControlLabel control={<Switch defaultChecked />} label="Да" />,
        footer: info => info.column.id,
    }),
    columnHelper.accessor('default_value', {
        header: 'Значение по умолчанию',
        cell: (cellContext) => editableInput(cellContext),
        footer: info => info.column.id,
    }),
] 

function useSkipper() {
    const shouldSkipRef = React.useRef(true)
    const shouldSkip = shouldSkipRef.current
  
    // Wrap a function with this to skip a pagination reset temporarily
    const skip = React.useCallback(() => {
      shouldSkipRef.current = false
    }, [])
  
    React.useEffect(() => {
      shouldSkipRef.current = true
    })
  
    return [shouldSkip, skip] as const
}



const ReactTable = ({ filterData }: tableProps) => {

    let { user_id } = useParams()

    const [data, setData] = React.useState(() => [...filterData])
    const [rowSelection, setRowSelection] = React.useState({})

    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()


    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
        autoResetPageIndex,
    // Provide our updateData function to our table meta
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex()
        setData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
              }
            }
            return row
          })
        )
      },
    },
    })
    

    const [selectedRowIds, setSelectedRowIds] = React.useState({});
    const selected_rows: FilterColumns[] = table.getSelectedRowModel().flatRows.map((row) => {

        return row.original
    });

    

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