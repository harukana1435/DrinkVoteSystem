import ShowResult from "@/app/ui/result/showresult";
import { fetchLatestResult } from "@/app/lib/data";

export default async function Page() {
    const resultlist = await fetchLatestResult();
    return (
        <div>
            <p>前回の結果</p>
            <div className="display: flex flex-wrap gap-10">
                {resultlist.map((result) => (
                    <div
                        key={result.name}
                        className="mt-3 flex flex-col items-center justify-center"
                    >
                        {
                            <ShowResult
                                name={result.name}
                                price={result.price}
                            />
                        }
                    </div>
                ))}
            </div>
        </div>
    );
}