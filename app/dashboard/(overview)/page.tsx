import { lusitana } from '@/app/ui/fonts';
//import Drink from '@/app/ui/drink_vote/page';
// import { Vote } from '@/app/ui/drink_vote/page';
import Drink_info from '@/app/ui/drink_vote/drink_info';
import { Voting_Button } from '@/app/ui/drink_vote/drink_info';

export default async function Page() {
  return (
    <main>
      <div className="relative">
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          飲料投票ページ
        </h1>
        <div className="p-4 md:h-40">
          <Drink_info />
        </div>
        <div className="bottom--100 absolute right-4">
          <Voting_Button />
          {/* <Drink /> */}
          {/* <Vote /> */}
        </div>
      </div>
    </main>
  );
}
