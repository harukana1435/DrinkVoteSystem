'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { montserrat } from '../fonts';
import { fredoka } from '../fonts';

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
            <p className="mb-1 ml-2 text-2xl">{id}</p>
            <button
                key={id}
                onClick={() => handleClick(id)}
                className={`rounded-md hover:scale-110 ${userSelect === id ? 'bg-psychedelic-blue' : searchParams.get('select')?.toString() === id ? 'border-5 bg-psychedelic-blue-lamp border-blue-500 ' : 'bg-gray-200'}`}
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
            <p className={`ml-2 ${fredoka.className} extrabold text-xl`}>
                Votes : {votedcount}
            </p>
        </div>
    );
}
