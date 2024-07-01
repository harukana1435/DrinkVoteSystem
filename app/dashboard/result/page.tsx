import { GET } from "@/app/api/cron/route";
import ShowResult from "@/app/ui/result/showresult";

export default function Page() {
    return (
        <div>
            <p>Result Page</p>
            <ShowResult />
        </div>
    );
}