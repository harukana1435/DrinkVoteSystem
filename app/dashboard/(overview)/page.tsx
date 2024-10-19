import { lusitana, noto_sans_jp } from '@/app/ui/fonts';
//import Drink from '@/app/ui/drink_vote/page';
// import { Vote } from '@/app/ui/drink_vote/page';
import Drink_info from '@/app/ui/drink_vote/drink_info';
import Search from '@/app/ui/search';
import {
  fetchDrinkPages,
  fetchSelectDrink,
  fetchDrinkNameByID,
} from '@/app/lib/data';
import Pagination from '@/app/ui/invoices/pagination';
import { GET } from '@/app/api/cron/route';
import ShowVoteMessage from '@/app/ui/drink_vote/ShowVoteMessage';
import { Session } from 'next-auth';
import { auth } from '@/auth';
import GuideText from '@/app/ui/dashboard/GuideText';

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    select?: string;
    page?: string;
    search?: string;
  };
}) {
  const select = searchParams?.select || '';
  const search = searchParams?.search || '';
  const currentPage = Number(searchParams?.page) || 1;
  const totalPages = await fetchDrinkPages(search);
  const session: Session | null = await auth();
  const date = new Date().toISOString().split('T')[0];
  const votedDrink = await fetchSelectDrink(session?.user?.email ?? '', date);
  const votedDrinkname = await fetchDrinkNameByID(votedDrink?.drink);
  const votedmessage =
    '本日は  ' + votedDrinkname?.japanesename + '  に投票しました';
  const normalmessage = '1日1回投票できるよ';
  console.log(votedDrinkname);

  return (
    <main>
      <div className="relative flex min-h-screen flex-col">
        <div className="flex-grow">
          <div>
            <h1 className={`${lusitana.className} specialTitle`}>
              {votedDrinkname?.japanesename != undefined
                ? votedmessage
                : normalmessage}
            </h1>
          </div>
          <div className="md:h-200 p-4">
            <Search placeholder="Search drinks..." />
          </div>

          <div className="mt-5 flex w-full justify-center">
            {<Pagination totalPages={totalPages} />}
          </div>
          <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
            <Drink_info search={search} currentPage={currentPage} />
          </div>
        </div>
        <ShowVoteMessage votedDrink={votedDrink?.drink ?? ''} />{' '}
        {/* ShowVoteMessageをここで呼び出す */}
      </div>
    </main>
  );
}
