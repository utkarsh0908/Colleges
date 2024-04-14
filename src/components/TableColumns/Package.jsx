import React from 'react'
import { addCommas } from '../../utils/tableUtils';
import { MdCompareArrows } from 'react-icons/md';

const Package = ({ item }) => {
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
}

export default Package