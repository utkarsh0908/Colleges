import React, { useEffect, useState } from "react";
import tabledata from "../data/tableData";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { sortTable } from "../utils/tableUtils";
import { GoDash } from "react-icons/go";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Input,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import FeaturedRibbon from "./FeaturedRibbon";
import {
  CDRank,
  Colleges,
  Fees,
  Package,
  UserReviews,
  Ranking,
} from "./TableColumns";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("CDRank", {
    header: "CD Rank",
    cell: (item) => <CDRank item={item} />,
  }),
  columnHelper.accessor("name", {
    header: "Colleges",
    cell: (item) => <Colleges item={item} />,
  }),
  columnHelper.accessor("fees", {
    header: "Course Fees",
    cell: (item) => <Fees item={item} />,
  }),
  columnHelper.accessor("package", {
    header: "Placements",
    cell: (item) => <Package item={item} />,
  }),
  columnHelper.accessor("reviews", {
    header: "User Reviews",
    cell: (item) => <UserReviews item={item} />,
  }),
  columnHelper.accessor("rank", {
    header: "Ranking",
    cell: (item) => <Ranking item={item} />,
  }),
];

const CollegeTable = () => {
  const [endingIndex, setEndingIndex] = useState(10);
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");
  const [tableData, setTableData] = useState(tabledata.slice(0, endingIndex));

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setEndingIndex((prev) => {
        if (prev < 30) return prev + 10;
      });
    }
  };

  useEffect(() => {
    const newTableData = tabledata.slice(0, endingIndex);
    setTableData(newTableData);
  }, [endingIndex]);

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
  }, []);

  useEffect(() => {
    sortTable(sorting, tableData, setTableData);
  }, [sorting]);

  return (
    <>
      <div className="flex flex-col items-center mb-20">
        <Input
          placeholder="Search"
          className="border border-1 border-gray-950 w-1/2 rounded py-1 px-2 my-8"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
        <TableContainer component={Paper}>
          <Table className="max-w-[1500px]">
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="bg-[#78bec3]">
                  {headerGroup.headers.map((header) => (
                    <TableCell
                      key={header.id}
                      className="border border-1 border-gray cursor-pointer hover:bg-[#6caaaf]"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        <span>
                          {header.column.getIsSorted() ? (
                            {
                              asc: <IoMdArrowDropup />,
                              desc: <IoMdArrowDropdown />,
                            }[header.column.getIsSorted()]
                          ) : (
                            <GoDash />
                          )}
                        </span>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`border border-1 border-gray !p-0 ${
                        cell.row.original.featured && "bg-[#fff0e6]"
                      }`}
                    >
                      {cell.column.id === "name" &&
                        cell.row.original.featured && (
                          <FeaturedRibbon>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </FeaturedRibbon>
                        )}
                      {(cell.column.id !== "name") | !cell.row.original.featured
                        ? flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        : null}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default CollegeTable;
