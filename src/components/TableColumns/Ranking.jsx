import React from 'react'
import { addSuffix } from '../../utils/tableUtils';

const Ranking = ({ item }) => {
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
}

export default Ranking