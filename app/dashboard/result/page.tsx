import ShowResult from "@/app/ui/result/showresult";
import ResultInfo from "@/app/ui/result/result_info";
import { fetchLatestResult } from "@/app/lib/data";
import { lusitana } from '@/app/ui/fonts';

export default async function Page() {

    return (
        <div>
            <h1 className={`${lusitana.className} bg-neutral-100 flex-1 rounded-lg pb-5 pt-5 mb-4 pl-4 text-xl`}>
                前回の結果
            </h1>
            <ResultInfo />
        </div>
    );
}