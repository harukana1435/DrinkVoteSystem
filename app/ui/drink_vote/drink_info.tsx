import {
    fetchUser_vote,
    fetchDrink,
    fetchVote,
    fetchSelectDrink,
    fetchFilteredDrink,
} from '@/app/lib/data';
import { Drink_Panel } from './drink_panels';
import { Session } from 'next-auth';
import { auth } from '@/auth';

export default async function Drink_info({
    search,
    currentPage,
}: {
    search: string;
    currentPage: number;
}) {
    const DrinkDatas = await fetchFilteredDrink(search, currentPage);
    const session: Session | null = await auth();
    const date = new Date().toISOString().split('T')[0];
    const selectDrink = await fetchSelectDrink(session?.user?.email ?? '', date);


  return (
    <div className="display: flex flex-wrap gap-10">
      {DrinkDatas.map((drink) => (
        <div
          key={drink.id}
          className="mt-3 flex flex-col items-center justify-center"
        >
          {
            <Drink_Panel
              id={drink.id}
              path={drink.path}
              name={drink.name}
              votedcount={drink.voted}
              totalvoted={drink.totalvoted}
              userSelect={selectDrink?.drink ?? ''}
            />
          }
        </div>
      ))}
    </div>
  );
}
