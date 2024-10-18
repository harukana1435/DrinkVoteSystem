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
      <div className="mt-4 flex justify-end shadow-md">
        <p className={`text-2xl font-semibold text-gray-800`}>
          合計金額:{' '}
          <span className="font-bold text-blue-600">{totalPrice}</span>円
        </p>
      </div>
    </div>
  );
}
