import React, { useEffect, useState } from "react";
import tabledata from "../data/tableData";
import { FaArrowRight } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";
import Checkbox from "@mui/material/Checkbox";
import { MdCompareArrows } from "react-icons/md";
import { FaCircle } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { FaChevronDown } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import { addCommas, addSuffix, handleSearchQueryChange, sortTable, handleInfiniteScroll } from "../utils/tableUtils";
import { GoDash } from "react-icons/go";
import { Input } from '@mui/material';
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from "@mui/material";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import FeaturedRibbon from "./FeaturedRibbon";

const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor("CDRank", {
    header: "CD Rank",
    cell: (item) => {
      return (
        <div className="p-4 font-semibold">#{item.row.original.CDRank}</div>
      );
    },
  }),
  columnHelper.accessor("name", {
    header: "Colleges",
    cell: (item) => {
      return (
        <div className="p-4">
          <h1 className="font-bold text-[#3dc1e4]">{item.row.original.name}</h1>
          <h2>{item.row.original.place}</h2>
          <div className="w-full flex justify-between">
            <p className="text-[#ff801e] font-semibold flex items-center text-[12px]">
              <FaArrowRight />
              Apply Now
            </p>
            <p className="text-[#6bd0b9] font-semibold flex items-center text-[12px]">
              <LuDownload />
              Download Brochure
            </p>
            <p className="font-semibold flex items-center text-[12px]">
              <Checkbox />
              Add To Compare
            </p>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("fees", {
    header: "Course Fees",
    cell: (item) => {
      return (
        <>
          <div className="w-full flex flex-col gap-1 p-4">
            <h1 className="text-[#29bd9e] font-bold">
              &#8377;{addCommas(item.row.original.fees)}
            </h1>
            <p className="text-[10px]">{item.row.original.course}</p>
            <h2 className="text-[10px]">-1st year fees</h2>
            <p className="text-xs text-[#ff801e] font-semibold flex items-center">
              <MdCompareArrows />
              Compare fees
            </p>
          </div>
        </>
      );
    },
  }),
  columnHelper.accessor("package", {
    header: "Placements",
    cell: (item) => {
      return (
        <>
          <div className="w-full flex flex-col gap-1 p-4">
            <h1 className="text-[#29bd9e] font-bold">
              &#8377;{addCommas(item.row.original.package.average)}
            </h1>
            <p className="text-[10px]">Average Package </p>
            <h1 className="text-[#29bd9e] font-bold">
              &#8377;{addCommas(item.row.original.package.highest)}
            </h1>
            <p className="text-[10px]">Highest Package </p>
            <p className="text-xs text-[#ff801e] font-semibold flex items-center">
              <MdCompareArrows />
              Compare Placement
            </p>
          </div>
        </>
      );
    },
  }),
  columnHelper.accessor("reviews", {
    header: "User Reviews",
    cell: (item) => {
      return (
        <div className="p-4">
          <h1 className="flex text-lg items-center">
            <FaCircle className="text-[#ff8c38] text-xs mr-2" />
            {item.row.original.reviews.rating}/10
          </h1>
          <p className="text-[10px]">
            Based on {item.row.original.reviews.users} User Reviews
          </p>
          <p className="text-[10px] text-[#e0939c] rounded font-semibold w-fit p-1 bg-[#fffae1] flex">
            <TiTick />
            Best in {item.row.original.reviews.bestIn} <FaChevronDown />
          </p>
        </div>
      );
    },
  }),
  columnHelper.accessor("rank", {
    header: "Ranking",
    cell: (item) => {
      return (
        <div className="p-4">
          <h1>
            #{addSuffix(item.row.original.rank)}/
            <span className="text-[#ff8c38] font-semibold">35</span> in India
          </h1>
          <div className="flex items-center">
            <img src="/IndiaToday.png" alt="india today" className="h-10" />
            <p>2023</p>
          </div>
        </div>
      );
    },
  }),
];


const CollegeTable = () => {
  const [endingIndex, setEndingIndex] = useState(10);
  const [sorting, setSorting] = useState([]);
  const [tableData, setTableData] = useState(tabledata.slice(0, endingIndex));
  const [searchQuery, setSearchQuery] = useState("");

  const table = useReactTable({
    data: tableData,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
  });

  
  const handleInfiniteScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.scrollHeight
    ) {
      setEndingIndex((prev) => {
        if(prev<30) return prev + 10
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
      <Input placeholder="Search" className="border border-1 border-gray-950 w-1/2 rounded py-1 px-2 my-8" onChange={(e) => handleSearchQueryChange(e, setSearchQuery, tabledata, setTableData, endingIndex)}/>
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
                          {
                            flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                            )
                          }
                        <span>
                          {
                            (header.column.columnDef.header!=="Colleges" && header.column.columnDef.header!=="Placements")  ?  (header.column.getIsSorted() ? {
                              asc: <IoMdArrowDropup />,
                              desc: <IoMdArrowDropdown />,
                            }[header.column.getIsSorted()] : <GoDash/>)
                            : null
                          }
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
