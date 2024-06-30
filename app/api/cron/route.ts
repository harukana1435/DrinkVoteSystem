import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { DrinkVoted } from '../../lib/definitions';
import { fetchTwoteeksResult } from '@/app/lib/data';
import { addVoteEveryTwoWeeks, deleteVoteEveryTwoWeeks } from '@/app/lib/actions';
import { NextRequest } from 'next/server';


export async function GET(request: NextRequest) {
    const VotedList = await fetchTwoteeksResult();
    try {
        await addVoteEveryTwoWeeks(); // votedの中身をtotalvotedに追加
        await deleteVoteEveryTwoWeeks(); // votedの中身を削除
        const messages = VotedList.map(DrinkResult => `${DrinkResult.name}を${DrinkResult.price}円分購入します`);
        console.log(messages)
        const messagesJson = JSON.stringify(messages); // メッセージをJSON文字列に変換
        return new Response(`
            <html>
            <head>
                <title>Cron Jobs Result</title>
                <script>
                    // サーバーサイドからのデータを取得して画面に表示する
                    const messages = ${messagesJson};
                    alert(messages.join('\\n')); // メッセージをアラートで表示する例
                    // 他の画面への反映
                </script>
            </head>
            <body>
                <h1>Cron Jobs Result</h1>
                <p>Completed cron jobs successfully.</p>
            </body>
            </html>
        `, { headers: { 'Content-Type': 'text/html' } });
    } catch (error) {
        console.error('cron jobs error', error);
        throw new Error('Failed to do cron jobs');
    }
}