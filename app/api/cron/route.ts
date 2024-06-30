import { NextRequest, NextResponse } from 'next/server';
import { fetchTwoteeksResult } from '@/app/lib/data';
import { addVoteEveryTwoWeeks, deleteVoteEveryTwoWeeks } from '@/app/lib/actions';

export async function GET(request: NextRequest) {
    const VotedList = await fetchTwoteeksResult();
    const messages = VotedList.map(result => `${result.name}を${result.price}円分購入します`);

    try {
        await addVoteEveryTwoWeeks(); // votedの中身をtotalvotedに追加
        await deleteVoteEveryTwoWeeks(); // votedの中身を削除

        console.log(messages);

        // HTMLの生成
        const html = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cron Job Results</title>
            </head>
            <body>
                <h2>Cron Job Results</h2>
                <ul>
                    ${messages.map(message => `<li>${message}</li>`).join('')}
                </ul>
            </body>
            </html>
        `;

        // HTMLをレスポンスとして返す
        return new NextResponse(html, {
            headers: {
                'Content-Type': 'text/html',
            },
        });
    } catch (error) {
        console.error('Cron job error', error);

        // エラーレスポンスのHTML生成
        const errorHtml = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Error</title>
            </head>
            <body>
                <h2>Failed to execute cron job</h2>
            </body>
            </html>
        `;

        return new NextResponse(errorHtml, {
            headers: {
                'Content-Type': 'text/html',
            },
        });
    }
}
