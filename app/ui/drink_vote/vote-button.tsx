import { Session } from 'next-auth';
import { auth } from '@/auth';
import { fetchUserByEmail, fetchVote } from '@/app/lib/data';
import { User } from '@/app/lib/definitions';
import { SubmitVote } from './submit-vote';
import { ChangeVote } from './change-vote';
import { DeleteVote } from './delete-vote';
import { VoteReset } from '@/app/lib/api';

export default async function VoteButton() {
  console.log('server component');
  const session: Session | null = await auth();
  const user: User | null = await fetchUserByEmail(session?.user?.email ?? '');
  const votedata = await fetchVote();
  const date = new Date().toISOString().split('T')[0];
  console.log(user);

  await VoteReset(user?.email ?? '', user?.lastvotereset ?? '');

  return (
    <>
      <div className="m-2 flex justify-center">{votedata[0]?.drink}</div>
      <div className="flex justify-center">
        <SubmitVote
          email={session?.user?.email ?? ''}
          voted={user?.voted ?? false}
        />
      </div>
      <div className="flex justify-center">
        <ChangeVote
          email={session?.user?.email ?? ''}
          voted={user?.voted ?? false}
        />
      </div>
      <div className="flex justify-center">
        <DeleteVote
          email={session?.user?.email ?? ''}
          voted={user?.voted ?? false}
        />
      </div>
    </>
  );
}
