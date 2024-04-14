import React from 'react'

const CDRank = ({ item }) => {
  return (
    <div className="p-4 font-semibold">#{item.row.original.CDRank}</div>
  );
}

export default CDRank;