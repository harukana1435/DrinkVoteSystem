'use client';

import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Drink() {

    return (
        <div className="display: flex gap-10">
            {['/mitsuyacider.png', '/cocacola.png', '/calpis.png'].map((image, index) => (
                <div key={index} className="rounded-md bg-blue-200">
                    <div key={index} className="mt-3 flex flex-col items-center justify-center">
                        <Image src={image} width={200} height={200} className="hidden md:block" alt="Screenshots of the dashboard project showing desktop version" />
                        <div className='mt-5'></div>  {/*画像とボタンの隙間*/}
                        <Vote />
                    </div>
                </div>
            ))}
        </div>
    );

}


export function Vote() {
    const [value, setValue] = useState(0);

    const handleChange = (e: any) => {
        const value = e.target.value;
        setValue(value);
    };
    return (
        <div>
            <div className="flex flex-col items-center justify-center" >
                <input type="range" id="number_of_vote" min="0" max="15" step="1" defaultValue={0} onChange={(e) => handleChange(e)}></input>
                <div>{value}</div>
                <button className="m-3 rounded-md bg-green-400">投票</button>
            </div >
        </div>
    );
}