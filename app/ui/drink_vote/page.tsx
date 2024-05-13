// 'use client';

// import { lusitana } from '@/app/ui/fonts';
// import Image from 'next/image';
// import React, { useState, useRef, useEffect } from 'react';
// import type { Drink } from '@/app/lib/definitions';
// import { fetchUser_vote, fetchDrink, fetchVote } from '@/app/lib/data';
// import Drink_info from './drink_info';

// // export function Drink() {

// //     return (
// //         <Drink_list />
// //     );

// // }

// export default async function Drink_list() {
//     const [clicked, setclicked] = useState(0);
//     const drink_datas = await fetchDrink();

//     const handleClick = () => {
//         setclicked(1)
//     }

//     return (
//         <div className="display: flex gap-10">
//             {drink_datas.map((drink_data) => (
//                 <div key={drink_data.id} >
//                     <div key={drink_data.id}>
//                         <div key={drink_data.id} className="mt-3 items-center justify-center">
//                             <button onClick={() => handleClick()} className={clicked === parseInt(drink_data.id) ? 'rounded-md bg-blue-200' : 'rounded-md bg-gray-200'}>
//                                 <Image src={drink_data.path} width={250} height={250} className="hidden md:block" alt="Screenshots of the dashboard project showing desktop version" />
//                             </button>
//                             <div className='mt-5'></div>  {/*画像とボタンの隙間*/}
//                             {/* <Vote /> */}
//                         </div>
//                     </div>
//                     {/* <div className='flex flex-col items-center justify-center'>
//                         <Result />
//                     </div> */}
//                 </div>
//             ))}
//         </div>
//     );
// }




// function Vote() {
//     const [value_Slide, setValue_Slide] = useState(0);
//     const [value_Box, setValue_Box] = useState(0);
//     const [clicked, setclicked] = useState(false);

//     const handleSlideChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value_Slide = parseInt(e.target.value);
//         //スライダーとボックスの値を同期させる
//         setValue_Slide(value_Slide);
//         setValue_Box(value_Slide);
//     };

//     const handleBoxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value_Box = e.target.value;

//         if (value_Box == '') { //ボックスの中身が空になったら
//             setValue_Slide(0); //スライダーの値は0にする
//             setValue_Box(parseInt('')); ///ボックスの中身は空のまま
//         }
//         else if (parseInt(value_Box) > 15) { //最大値は15に設定 (後で最大値は残り投票数に変える必要あり)
//             setValue_Box(15);
//         }
//         else {     //空じゃない時はスライダーとボックスの値を同期させる
//             setValue_Slide(parseInt(value_Box));
//             setValue_Box(parseInt(value_Box));
//         }
//     };

//     const handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const value_Box = e.target.value;
//         if (value_Box == '') {
//             setValue_Box(0);
//         }

//     };


//     const handleClick = () => {
//         setclicked(true);
//     }



//     return (
//         <div>
//             <div className="flex flex-col items-center justify-center" >
//                 <input type="range" id="number_of_vote" min="0" max="15" step="1" defaultValue={0} value={value_Slide} onChange={(e) => handleSlideChange(e)}></input>
//                 {/* <div>{value}</div> */}
//                 <div className='mt-5'></div>  {/*スライダーとboxの隙間*/}
//                 <input className="mb-5 rounded-md text-center" type="number" id="number_of_vote" defaultValue={0} value={value_Box} onChange={(e) => handleBoxChange(e)} onBlur={(e) => handleBlur(e)} style={{ width: '50px' }}></input>
//                 {/* <button className="m-5 rounded-md bg-green-400" onClick={handleClick}>
//                     <div className="m-1 mx-3">投票</div>
//                 </button>
//                 {clicked && <p>{value_Slide}票投票しました</p>} */}
//             </div>
//         </div>
//     );
// }

// function Result() {
//     const [clicked, setclicked] = useState(false);

//     const handleClick = () => {
//         setclicked(true);
//     }

//     const handleConfirmClick = () => {
//         setclicked(false);
//     }

//     return (
//         <div>
//             <button className="m-5 rounded-md bg-green-400" onClick={handleClick}>
//                 <div className="m-1 mx-3">投票</div>
//             </button>

//             {/* 確認画面 */}
//             {clicked &&
//                 <div className="rounded-md bg-gray-200">
//                     <p className='text-center'>投票しますか？</p>
//                     <div className=" display: flex gap-10">
//                         <button className="m-5 rounded-md bg-green-400" onClick={handleConfirmClick}>はい</button>
//                         <button className="m-5 rounded-md bg-green-400" onClick={() => setclicked(false)}>いいえ</button>
//                     </div>
//                 </div>
//             }
//         </div>
//     );
// }