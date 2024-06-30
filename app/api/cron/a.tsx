import { fetchTwoteeksResult } from "@/app/lib/data";
import ShowResult from "./result";


export default async function Result() {
    const VotedList = await fetchTwoteeksResult();
    return (
        <div>
            <ShowResult results={VotedList} />
        </div>
    );
}