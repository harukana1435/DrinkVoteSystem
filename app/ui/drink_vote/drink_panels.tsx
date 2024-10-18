'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { montserrat } from '../fonts';
import { fredoka, noto_sans_jp } from '../fonts';

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
    <div className="relative flex flex-col items-center">
      <button
        key={id}
        onClick={() => handleClick(id)}
        className={`button rounded-md hover:scale-110 ${userSelect === id ? 'bg-psychedelic-blue' : searchParams.get('select')?.toString() === id ? 'border-5 bg-psychedelic-blue-lamp border-blue-500 ' : 'bg-gray-200'}`}
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
      <p
        className={`absolute right-2 top-1 rounded-full bg-yellow-400 px-3 py-1 text-sm font-bold text-black shadow-md`}
      >
        {votedcount}票
      </p>
    </div>
  );
}
