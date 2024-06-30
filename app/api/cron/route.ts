import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { DrinkVoted } from '../../lib/definitions';
import { fetchTwoteeksResult } from '@/app/lib/data';
import { addVoteEveryTwoWeeks, deleteVoteEveryTwoWeeks } from '@/app/lib/actions';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const VotedList = await fetchTwoteeksResult();
    const messages = VotedList.map(DrinkResult => `${DrinkResult.name}を${DrinkResult.price}円分購入します`);
    try {
        await addVoteEveryTwoWeeks(); // votedの中身をtotalvotedに追加
        await deleteVoteEveryTwoWeeks(); // votedの中身を削除
        console.log(messages);
        return new Response(JSON.stringify({ text: messages }));
    } catch (error) {
        console.error('cron jobs error', error);
        throw new Error('Failed to do cron jobs');
    }
}