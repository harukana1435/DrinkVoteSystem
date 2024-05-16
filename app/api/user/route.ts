import { sql } from '@vercel/postgres';
import { unstable_noStore as noStore } from 'next/cache';
import { User } from '../../lib/definitions';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  noStore();

  try {
    const email = await request.json();
    const data =
      await sql<User>`SELECT * FROM users WHERE users.email = ${email}`;
    const returnBody = data.rows[0];

    return new Response(JSON.stringify({ body: returnBody }));
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch User Vote data.');
  }
}
