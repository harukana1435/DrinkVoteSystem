import { DrinkVoted } from '../../lib/definitions';
import { fetchDrink } from '../../lib/data';
import { fetchTwoteeksResult, addVoteEveryTwoWeeks, deleteVoteEveryTwoWeeks } from './route';

export default async function EveryTwoWeeks() {
    const VotedList = await fetchTwoteeksResult();
    await addVoteEveryTwoWeeks(); // votedの中身をtotalvotedに追加
    await deleteVoteEveryTwoWeeks(); // votedの中身を削除
}