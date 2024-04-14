import React from 'react'
import { addCommas } from '../../utils/tableUtils';
import { MdCompareArrows } from 'react-icons/md';

const Fees = ({ item }) => {
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
}

export default Fees