'use client'

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export function VoteButton({ id, path }: { id: string, path: string }) {
    const [clicked, setclicked] = useState(-1);
    const Ref = useRef();

    const handleClick = (id: string) => {
        setclicked(parseInt(id));
    }

    return (
        <div>
            <p>クリック: {clicked}</p>
            <button key={id} onClick={() => handleClick(id)} className={clicked === parseInt(id) ? 'rounded-md bg-blue-200' : 'rounded-md bg-gray-200'}>
                <Image src={path} width={250} height={250} className="hidden md:block" alt="Screenshots of the dashboard project showing desktop version" />
            </button>
        </div>
    );
}