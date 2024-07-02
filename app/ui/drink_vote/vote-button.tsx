import { Session } from 'next-auth';
import { auth } from '@/auth';
import { fetchUserByEmail, fetchVote } from '@/app/lib/data';
import { User } from '@/app/lib/definitions';
import { SubmitVote } from './submit-vote';
import { ChangeVote } from './change-vote';
import { DeleteVote } from './delete-vote';
import { VoteReset } from '@/app/lib/api';

export default async function VoteButton() {
    const session: Session | null = await auth();
    const user: User | null = await fetchUserByEmail(session?.user?.email ?? '');
    const votedata = await fetchVote();

    await VoteReset(user?.email ?? '', user?.lastvotereset ?? '');


  return (
    <>
      {/* <div className="flex justify-center m-4">{votedata[0]?.drink}</div> */}
      <div className="flex justify-center m-2">
        <SubmitVote
          email={session?.user?.email ?? ''}
          voted={user?.voted ?? false}
        />
      </div>
      <div className="flex justify-center m-2">
        <ChangeVote
          email={session?.user?.email ?? ''}
          voted={user?.voted ?? false}
        />
      </div>
      <div className="flex justify-center m-2">
        <DeleteVote
          email={session?.user?.email ?? ''}
          voted={user?.voted ?? false}
        />
      </div>
    </>
  );
}
