'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Drink } from '@/app/lib/definitions';
import { lusitana } from '../fonts';

export default function GuideText({
  votedDrink,
  votedDrinkname,
}: {
  votedDrink: string;
  votedDrinkname: string;
}) {
  const searchParams = useSearchParams();
  const selectValue = searchParams.get('select'); // selectの値を取得
  const [isVisible, setIsVisible] = useState(false); // スライド表示のためのステート

  console.log(votedDrinkname);

  useEffect(() => {
    if (selectValue && selectValue != votedDrink) {
      setIsVisible(true); // selectが存在する場合は表示
    } else {
      setIsVisible(false); // selectが存在しない場合は非表示
    }
  }, [selectValue]); // selectValueが変わるたびに実行

  // メッセージの内容
  const votedmessage = '本日は' + votedDrinkname + 'に投票しました';
  const selectedmessage = '飲み物を選択しています';
  const normalmessage = '1日1回投票できるよ' + votedDrinkname;

  return (
    <h1 className={`${lusitana.className} specialTitle`}>
      {votedDrinkname != ''
        ? votedmessage
        : isVisible
          ? selectedmessage
          : normalmessage}
    </h1>
  );
}
