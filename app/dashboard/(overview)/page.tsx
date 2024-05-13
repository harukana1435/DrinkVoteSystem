import { lusitana } from '@/app/ui/fonts';
//import Drink from '@/app/ui/drink_vote/page';
// import { Vote } from '@/app/ui/drink_vote/page';
import Drink_info from '@/app/ui/drink_vote/drink_info';
import { Vote_Button } from '@/app/ui/drink_vote/button';

export default async function Page() {
  return (
    <main>
      <div>
        <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
          飲料投票ページ
        </h1>
      </div>
      <div className="md:h-200 p-4">
        <Drink_info />
      </div>
      <Vote_Button />
      {/* <Drink /> */}
      {/* <Vote /> */}
    </main>
  );
}
