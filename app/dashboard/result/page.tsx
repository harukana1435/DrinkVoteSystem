import ShowResult from "@/app/ui/result/showresult";
import { fetchLatestResult } from "@/app/lib/data";

export default function Page() {
    return (
        <div>
            <p>Result Page</p>
            <ShowResult />
        </div>
    );
}