import { lusitana, noto_sans_jp } from '@/app/ui/fonts';
//import Drink from '@/app/ui/drink_vote/page';
// import { Vote } from '@/app/ui/drink_vote/page';
import Drink_info from '@/app/ui/drink_vote/drink_info';
import VoteButton from '@/app/ui/drink_vote/vote-button';
import Search from '@/app/ui/search';
import { fetchDrinkPages } from '@/app/lib/data';
import Pagination from '@/app/ui/invoices/pagination';
import { GET } from '@/app/api/cron/route';

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

  return (
    <main>
      <div className="flex min-h-screen flex-col">
        <div className="flex-grow">
          <div>
            <h1
              className={`${lusitana.className} mb-4 flex-1 rounded-lg bg-neutral-100 pb-5 pl-4 pt-5 text-xl ${noto_sans_jp.className}`}
            >
              飲料投票 / Drink Voting
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
      </div>
    </main>
  );
}
