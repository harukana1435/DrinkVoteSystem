import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import type { Drink } from '@/app/lib/definitions';
import { fetchUser_vote, fetchDrink, fetchVote } from '@/app/lib/data';
import { Select_Button } from './button';
import { DrinkList } from './newpage_links';


export default async function Drink_info() {
    const drink_datas = await fetchDrink();
    return (
        <div>
            <DrinkList drinkdatas={drink_datas} />
        </div>
    );
}
