import * as React from "react";

import axios from "axios";
import {
    CellContext,
    CoreRow,
    RowData,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Button,
    Checkbox,
    FormControlLabel,
    IconButton,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { FilterColumns } from "../../../types/filter";
import AddIcon from "@mui/icons-material/Add";
import ScrollDialog from "../../quiz/Dialog";

interface tableProps {
    filterData: FilterColumns[];
    children?: React.ReactNode;
}

declare module "@tanstack/react-table" {
    interface TableMeta<TData extends RowData> {
        updateData: (
            rowIndex: number,
            columnId: string,
            value: unknown
        ) => void;
    }
}

const editableInput = (row_arg: CellContext<FilterColumns, string>) => {
    const {
        getValue,
        row,
        column: { id, columnDef },
        table,
    } = row_arg;

    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState<boolean | string>(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
        table.options.meta?.updateData(row.index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    switch ((columnDef as any).accessorKey) {
        case "createdByUser":
            return (
                <>
                    <Checkbox
                        color="primary"
                        checked={!!value}
                        onChange={(e) => setValue(e.target.checked)}
                        onBlur={onBlur}
                    />
                    {/* <span>Добавить фильтр</span> */}
                </>
            );

        case "readonly":
            return (
                <FormControlLabel
                    control={
                        <Switch
                            checked={!!value}
                            onChange={(e) => setValue(e.target.checked)}
                            onBlur={onBlur}
                        />
                    }
                    label={!!value ? "Да" : "Нет"}
                />
            );

        case "default_value":
            switch (row.original.filter_type) {
                case "date":
                    return (
                        <TextField
                            label="Выберите дату"
                            type="date"
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={value as string}
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={onBlur}
                        />
                    );
                case "range":
                    return <> dsa</>;
                case "zodiak":
                    return;

                default:
                    return (
                        <TextField
                            label="Ввeдите текст"
                            type="text"
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={value as string}
                            onChange={(e) => setValue(e.target.value)}
                            onBlur={onBlur}
                        />
                    );
            }
    }
};

const columnHelper = createColumnHelper<FilterColumns>();

const columns = [
    columnHelper.accessor("filter_name", {
        header: "Название фильтра",
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("createdByUser", {
        header: ({ table }) => (
            <>
                <Checkbox
                    color="primary"
                    checked={table.getIsAllRowsSelected()}
                    onChange={table.getToggleAllRowsSelectedHandler()}
                />
                <span>Добавить фильтр</span>
            </>
        ),
        cell: ({ row }) => (
            <Checkbox
                color="primary"
                checked={row.getIsSelected()}
                onChange={row.getToggleSelectedHandler()}
            />
        ),
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("readonly", {
        header: "Только для чтения",
        cell: (e) => editableInput,
        footer: (info) => info.column.id,
    }),
    columnHelper.accessor("default_value", {
        header: "Значение по умолчанию",
        cell: editableInput,
        footer: (info) => info.column.id,
    }),
];

function useSkipper() {
    const shouldSkipRef = React.useRef(true);
    const shouldSkip = shouldSkipRef.current;

    // Wrap a function with this to skip a pagination reset temporarily
    const skip = React.useCallback(() => {
        shouldSkipRef.current = false;
    }, []);

    React.useEffect(() => {
        shouldSkipRef.current = true;
    });

    return [shouldSkip, skip] as const;
}

const ReactTable = ({ filterData }: tableProps) => {
    let { user_id } = useParams();

    const [data, setData] = React.useState(() => [...filterData]);
    const [openRowForm, setopenRowForm] = React.useState(false);

    const [rowSelection, setRowSelection] = React.useState({
        ...data.map((el) => {
            return el.createdByUser;
        }),
    } as {});

    const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
        },
        autoResetPageIndex,
        // Provide our updateData function to our table meta
        meta: {
            updateData: (rowIndex, columnId, value) => {
                // Skip page index reset until after next rerender
                skipAutoResetPageIndex();
                setData((old) =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex]!,
                                [columnId]: value,
                            };
                        }
                        return row;
                    })
                );
            },
        },
    });

    const selected_rows: FilterColumns[] = table
        .getSelectedRowModel()
        .flatRows.map((row) => {
            return row.original;
        });

    const sendData = (send_data: FilterColumns[]) => {
        axios.post(`/profile_actions/${user_id}`, {
            data: send_data,
            _method: "PUT",
        });
    };

    return (
        <div className="p-2">
            <Toolbar
                sx={{
                    pl: { sm: 2 },
                    pr: { xs: 1, sm: 1 },
                }}
            >
                <Typography
                    sx={{ flex: "1 1 100%" }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Фильтры для пользователя {user_id}
                </Typography>

                <Tooltip title="Filter list">
                    <IconButton size="large" onClick={() => setopenRowForm(!openRowForm)}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>
            </Toolbar>
            {openRowForm && <ScrollDialog >
                <p>
                    dsad
                </p>
            </ScrollDialog>}
            <TableContainer sx={{ maxHeight: "750px" }}>
                <Table
                    stickyHeader
                    aria-label="sticky dense table"
                    aria-labelledby="tableTitle"
                    size="small"
                >
                    <TableHead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableCell key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableHead>
                    <TableBody>
                        {table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="h-2" />
            <div className="flex items-center gap-2">
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<<"}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    {"<"}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    {">"}
                </button>
                <button
                    className="border rounded p-1"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    {">>"}
                </button>
                <span className="flex items-center gap-1">
                    <div>Page</div>
                    <strong>
                        {table.getState().pagination.pageIndex + 1} of{" "}
                        {table.getPageCount()}
                    </strong>
                </span>
                <span className="flex items-center gap-1">
                    | Go to page:
                    <input
                        type="number"
                        defaultValue={table.getState().pagination.pageIndex + 1}
                        onChange={(e) => {
                            const page = e.target.value
                                ? Number(e.target.value) - 1
                                : 0;
                            table.setPageIndex(page);
                        }}
                        className="border p-1 rounded w-16"
                    />
                </span>
                <select
                    value={table.getState().pagination.pageSize}
                    onChange={(e) => {
                        table.setPageSize(Number(e.target.value));
                    }}
                >
                    {[1, 10, 20, 30, 40, 50].map((pageSize) => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>

            <Button onClick={() => sendData(selected_rows)} variant="contained">
                Сохранить фильтры
            </Button>

            {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}

            <div className="h-4" />
        </div>
    );
};

export default ReactTable;
