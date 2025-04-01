import { useState } from "react";
import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";

export default function DataTable({ columns, data }) {

    const { getTableProps, headerGroups, page, prepareRow } = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 100000, pageIndex: 0 },
        },
        useFilters,
        useSortBy,
        usePagination
    );

    return (
        <div className="w-full">
            {/* <div className="flex items-center py-4">
                <input
                    placeholder="Filter emails..."
                    value={(table.getColumn("distance")?.getFilterValue()) ?? ""}
                    onChange={(event) =>
                        table.getColumn("distance")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />
            </div> */}
            <div className="border">
                <Table {...getTableProps()}>
                    <TableHeader>
                        {headerGroups.map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((column, key) => (
                                    <TableHead

                                        key={key}
                                        width={column.marginLeft} {...column.getHeaderProps(column.getSortByToggleProps())}
                                        {...column.getHeaderProps(column.isSortingEnable !== false ? column.getSortByToggleProps() : {})}


                                    >
                                        <div>{column.render("Header")}</div>

                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody className="bg-white">
                        {page.length > 0 ? (
                            page.map((row, i) => {
                                prepareRow(row);
                                return (
                                    <TableRow key={row.id}>

                                        {row.cells.map((cell) => {
                                            return (
                                                <TableCell key={cell.id} {...cell.getCellProps()} >
                                                    {cell.render("Cell")}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })
                        ) : (null
                            /* <p className="text-center mt-5 mb-5 text-bold">No records found</p>*/
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
