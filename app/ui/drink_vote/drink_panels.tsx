'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function Drink_Panel({
  id,
  path,
  name,
  votedcount,
  totalvoted,
  userSelect,
}: {
  id: string;
  path: string;
  name: string;
  votedcount: number;
  totalvoted: number;
  userSelect: string;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClick(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('select', term);
    } else {
      params.delete('select');
    }
    replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return (
    <div>
      {/* <p>
        クリック：{searchParams.get('select')?.toString()}
        総投票数：{totalvoted}
      </p> */}
      <p className="text-2xl ml-2 mb-1">
        {name}
      </p>
      <button
        key={id}
        onClick={() => handleClick(id)}
        className={
          userSelect === id
            ? 'rounded-md bg-red-200 hover:scale-110 active:scale-105'
            : searchParams.get('select')?.toString() === id
              ? 'rounded-md bg-blue-200 hover:scale-110 active:scale-105'
              : 'rounded-md bg-gray-200 hover:scale-110 active:scale-105'
        }
      >
        <Image
          src={path}
          width={200}
          height={200}
          className="hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
          priority={true}
        />
      </button>
      <p className="ml-2">
      投票数 : {votedcount}
      </p>
    </div>
  );
}
