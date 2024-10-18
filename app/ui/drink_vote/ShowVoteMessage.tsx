'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

export default function ShowVoteMessage() {
  const searchParams = useSearchParams();
  const selectValue = searchParams.get('select'); // selectの値を取得
  const [isVisible, setIsVisible] = useState(false); // スライド表示のためのステート

  useEffect(() => {
    if (selectValue) {
      setIsVisible(true); // selectが存在する場合は表示
    } else {
      setIsVisible(false); // selectが存在しない場合は非表示
    }
  }, [selectValue]); // selectValueが変わるたびに実行

  // メッセージの内容
  const message = '左側のボタンを押したら投票完了!!';

  return (
    <div
      className={`absolute bottom-20 left-0 right-0 z-50 transition-transform duration-300 ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      {/* absolute を使用して画面の下から少し上に表示 */}
      <div
        className={`mx-auto w-80 rounded-full bg-white p-4 text-center  ${isVisible ? 'shadow-lg' : ''}`}
      >
        {/* 楕円形を作成 */}
        <p className="text-red-600">{isVisible ? message : ''}</p>
      </div>
    </div>
  );
}
