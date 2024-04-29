'use client';

import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';

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


function Vote() {
    const [value_Slide, setValue_Slide] = useState(0);
    const [value_Box, setValue_Box] = useState(0);
    const [clicked, setclicked] = useState(false);

    const handleSlideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value_Slide = parseInt(e.target.value);
        //スライダーとボックスの値を同期させる
        setValue_Slide(value_Slide);
        setValue_Box(value_Slide);
    };

    const handleBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value_Box = e.target.value;

        if (value_Box == '') { //ボックスの中身が空になったら
            setValue_Slide(0); //スライダーの値は0にする
            setValue_Box(parseInt('')); ///ボックスの中身は空のまま
        }
        else {     //空じゃない時はスライダーとボックスの値を同期させる
            setValue_Slide(parseInt(value_Box));
            setValue_Box(parseInt(value_Box));
        }
    };

    const handleClick = () => {
        setclicked(true);
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center" >
                <input type="range" id="number_of_vote" min="0" max="15" step="1" defaultValue={0} value={value_Slide} onChange={(e) => handleSlideChange(e)}></input>
                {/* <div>{value}</div> */}
                <div className='mt-5'></div>  {/*スライダーとboxの隙間*/}
                <input className="rounded-md text-center" type="number" id="number_of_vote" defaultValue={0} value={value_Box} onChange={(e) => handleBoxChange(e)} style={{ width: '50px' }}></input>
                <button className="m-5 rounded-md bg-green-400" onClick={handleClick}>
                    <div className="m-1 mx-3">投票</div>
                </button>
                {clicked && <p>{value_Slide}票分投票しました</p>}
            </div>
        </div>
    );
}

function resullt() {

}