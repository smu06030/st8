import React from 'react';
import Link from 'next/link';

interface StampCardPropsType {
  stamp: {
    id: string;
    userid: string;
    region: string;
    visited: boolean;
    date: string;
  };
}

const StampItem = ({ stamp }: StampCardPropsType) => {
  // console.log('stamp', stamp);
  return (
    <li className="flex flex-col items-center justify-center bg-[#ccc] p-3">
      <Link href={`/stamp-all/${stamp.id}`}>
        <div>{stamp.region}</div>
        <div>{stamp.date}</div>
      </Link>
    </li>
  );
};

export default StampItem;
