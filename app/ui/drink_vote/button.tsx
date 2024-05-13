'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function Select_Button({ id, path }: { id: string; path: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClick(term: string) {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('query', term);
    } else {
      params.delete('query');
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div>
      <p>クリック: {searchParams.get('query')?.toString()}</p>
      <button
        key={id}
        onClick={() => handleClick(id)}
        className={
          searchParams.get('query')?.toString() === id
            ? 'rounded-md bg-blue-200'
            : 'rounded-md bg-gray-200'
        }
      >
        <Image
          src={path}
          width={250}
          height={250}
          className="hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
      </button>
    </div>
  );
}

export function Vote_Button() {
  return (
    <div className="m-4s">
      <button className="rounded-md bg-green-500">
        <p>投票</p>
      </button>
    </div>
  );
}
