import React from "react";
import { Checkbox } from "@mui/material";
import { FaArrowRight } from "react-icons/fa";
import { LuDownload } from "react-icons/lu";

const Colleges = ({ item }) => {
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
};

export default Colleges;
