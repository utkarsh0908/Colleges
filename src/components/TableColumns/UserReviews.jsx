import React from 'react'
import { FaChevronDown, FaCircle } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';

const UserReviews = ({ item }) => {
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
}

export default UserReviews