import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { DrinkVoted } from '../../lib/definitions';
import { fetchTwoteeksResult } from '@/app/lib/data';
import { addVoteEveryTwoWeeks, deleteVoteEveryTwoWeeks, updateresult } from '@/app/lib/actions';
import { NextRequest } from 'next/server';


export async function GET() {
    const VotedList = await fetchTwoteeksResult();
    const namelist = VotedList.map(list => list.name);
    const pricelist = VotedList.map(list => list.price);
    const messages = VotedList.map(DrinkResult => `${DrinkResult.name}を${DrinkResult.price}円分購入します`);
    try {
        await updateresult(namelist, pricelist);
        await addVoteEveryTwoWeeks(); // votedの中身をtotalvotedに追加
        await deleteVoteEveryTwoWeeks(); // votedの中身を削除
        console.log(messages);
        return new Response(JSON.stringify({ text: messages }));
    } catch (error) {
        console.error('cron jobs error', error);
        throw new Error('Failed to do cron jobs');
    }
}
