import ResultInfo from '@/app/ui/result/result_info';

import { lusitana } from '@/app/ui/fonts';

export default function Page() {
  return (
    <div>
      <h1 className={`${lusitana.className} specialTitle`}>前回の結果</h1>
      <ResultInfo />
    </div>
  );
}
