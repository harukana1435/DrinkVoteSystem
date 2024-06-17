// 'use client'

// import React, { useState, useEffect } from 'react';
// import { addVoteEveryTwoWeeks, deleteVoteEveryTwoWeeks } from '@/app/lib/actions';
// import { EveryTwoWeeks } from './Result';

// export default function TimerComponent() {
//     const two_weeks = 14 * 24 * 60 * 60 * 1000;
//     var finish = new Date(2024, 5, 5, 16, 33).getTime(); //月は1ヶ月ずれてる
//     while (finish < new Date().getTime()) {
//         finish += + two_weeks
//     }
//     const [timeRemaining, setTimeRemaining] = useState(0);

//     useEffect(() => {
//         const timer = setInterval(() => {
//             const now = new Date().getTime();
//             const remain = finish - now;
//             setTimeRemaining(remain);

//             if (remain <= 0) {
//                 finish += + two_weeks
//                 setTimeRemaining(finish);
//                 EveryTwoWeeks();
//             }
//         }, 1000);

//     }, [finish]);



//     const formatTime = (milliseconds: number) => {
//         const totalSeconds = Math.floor(milliseconds / 1000);
//         const days = Math.floor(totalSeconds / (24 * 60 * 60));
//         const hours = Math.floor((totalSeconds % (24 * 60 * 60)) / (60 * 60));
//         const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
//         const seconds = totalSeconds % 60;

//         return `残り${days}日 ${hours}時間 ${minutes}分 ${seconds}秒`;
//     };

//     return (
//         <div>
//             <h1>2週間タイマー</h1>
//             <p>{formatTime(timeRemaining)}</p>
//         </div>
//     );
// };