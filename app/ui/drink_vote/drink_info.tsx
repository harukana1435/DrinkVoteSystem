import { lusitana } from '@/app/ui/fonts';
import { fetchUser_vote, fetchDrink, fetchVote } from '@/app/lib/data';
import { Select_Button } from './button';


export default async function Drink_info({ pagenumber }: { pagenumber: number }) {
    const drink_datas = await fetchDrink();

    return (
        <div className="display: flex flex-wrap gap-10">
            {drink_datas
                .slice((pagenumber) * 10, (pagenumber + 1) * 10) // 指定された範囲内の要素のみを抽出
                .map((drink_data) => (
                    <div
                        key={drink_data.id}
                        className="mt-3 flex flex-col items-center justify-center"
                    >
                        {<Select_Button id={drink_data.id} path={drink_data.path} />}
                    </div>
                ))}
        </div>
    );
}
