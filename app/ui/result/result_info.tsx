import ShowResult from '@/app/ui/result/showresult';
import { fetchLatestResult } from '@/app/lib/data';
import { fredoka } from '../fonts';

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
      <p className={`ml-2 ${fredoka.className} extrabold text-xl`}>
        Total Prices: {totalPrice}円分
      </p>
    </div>
  );
}
