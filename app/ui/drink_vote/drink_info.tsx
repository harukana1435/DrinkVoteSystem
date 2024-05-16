import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';
import type { Drink } from '@/app/lib/definitions';
import { fetchUser_vote, fetchDrink, fetchVote } from '@/app/lib/data';
import { Drink_Panel } from './drink_panels';

export default async function Drink_info() {
  const drink_datas = await fetchDrink();
  return (
    <div className="display: flex flex-wrap gap-10">
      {drink_datas.map((drink_data) => (
        <div
          key={drink_data.id}
          className="mt-3 flex flex-col items-center justify-center"
        >
          {<Drink_Panel id={drink_data.id} path={drink_data.path} />}
        </div>
      ))}
    </div>
  );
}
