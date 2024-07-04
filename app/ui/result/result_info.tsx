import ShowResult from "@/app/ui/result/showresult";
import { fetchLatestResult } from "@/app/lib/data";

export default async function ResultInfo() {
    const resultlist = await fetchLatestResult();
    const totalPrice = resultlist.reduce((acc, result) => acc + result.price, 0);

    return (
        <div>
            <div className="display: flex flex-wrap gap-10">
                {resultlist.map((result) => (
                    <div
                        key={result.name}
                        className="mt-3 flex flex-col items-center justify-center"
                    >
                        {
                            <ShowResult
                                name={result.name}
                                japanesename={result.japanesename}
                                price={result.price}
                            />
                        }
                    </div>
                ))}
            </div>
            合計{totalPrice}円
        </div>
    );
}