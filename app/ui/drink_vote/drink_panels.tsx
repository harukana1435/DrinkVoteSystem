'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export function Drink_Panel({ id, path }: { id: string; path: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  function handleClick(term: string) {
    const params = new URLSearchParams(searchParams);
    console.log(searchParams.get('query')?.toString());
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
          searchParams.get('query')?.toString() === id.toString()
            ? 'rounded-md bg-blue-200'
            : 'rounded-md bg-gray-200'
        }
      >
        <Image
          src={path}
          width={200}
          height={200}
          className="hidden md:block"
          alt="Screenshots of the dashboard project showing desktop version"
        />
      </button>
    </div>
  );
}
