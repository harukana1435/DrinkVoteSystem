'use server';

import { number, z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { fetchDrinkExist, fetchDrinkNum, VoteExist } from './data';

const FormSchema = z.object({
    email: z.string(),
    drink: z.string(),
    voted: z.coerce.boolean(),
    date: z.string(),
});

const CreateVote = FormSchema.omit({ date: true });

const UpdateVote = FormSchema.omit({ date: true });

const DeleteVote = FormSchema.omit({ drink: true, date: true });

// This is temporary until @types/react-dom is updated
export type State = {
    errors?: {
        email?: string[];
        drink?: string[];
        voted?: string[];
        date?: string[];
    };
    message?: string | null;
};

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin': //CredentialsSigninの時にエラーが出た場合の警告文
                    //return 'Invalid credentials.';
                    return 'EmailかPasswordが間違っています';
                default: //それ以外の場合の警告文
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function createVote(
    _email: string,
    _drink: string,
    _voted: boolean,
    prevState: State,
) {
    // Validate form fields using Zod
    const validatedFields = CreateVote.safeParse({
        email: _email,
        drink: _drink,
        voted: _voted,
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Vote.',
        };
    }

    // Prepare data for insertion into the database
    const { email, drink, voted } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

    if (voted) {
        return {
            message: 'You have voted already',
        };
    }

    if ((await fetchDrinkExist(drink)) == false) {
        return {
            message: 'You have voted already',
        };
    }

    try {
        console.log({ email, drink, date });
        await sql`
            INSERT INTO vote (voter, drink, date)
            VALUES (${email}, ${drink}, ${date})
        `;
        console.log({ email, drink, date });
        await sql`
    UPDATE users
    SET voted = ${true}
    WHERE email = ${email}
      `;

        console.log({ email, drink, voted });
    } catch (error) {
        // If a database error occurs, return a more specific error.
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    }

    // Revalidate the cache for the invoices page and redirect the user.
    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export async function updateVote(
    _email: string,
    _drink: string,
    _voted: boolean,
    prevState: State,
) {
    // Validate form fields using Zod
    const validatedFields = UpdateVote.safeParse({
        email: _email,
        drink: _drink,
        voted: _voted,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Vote.',
        };
    }

    const { email, drink, voted } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];

    if (!voted) {
        return {
            message: 'You have not voted yet',
        };
    }

    if ((await VoteExist(email, date)) == false) {
        return {
            message: 'no drink',
        };
    }

    try {
        await sql`
            UPDATE vote
            SET drink= ${drink}
            WHERE voter = ${email} AND date=${date}
        `;

        await sql`
    UPDATE users
    SET voted = ${true}
    WHERE email = ${email}
      `;
        console.log({ email, drink, date });
    } catch (error) {
        return { message: 'Database Error: Failed to Update Vote.' };
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');
}

export async function deleteVote(
    _email: string,
    _voted: boolean,
    prevState: State,
) {
    // Validate form fields using Zod
    const validatedFields = DeleteVote.safeParse({
        email: _email,
        voted: _voted,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Vote.',
        };
    }

    const { email, voted } = validatedFields.data;
    const date = new Date().toISOString().split('T')[0];
    if (!voted) {
        return {
            message: 'You have not voted yet',
        };
    }
    if ((await VoteExist(email, date)) == false) {
        return {
            message: 'no drink',
        };
    }
    try {
        await sql`
    DELETE FROM vote
    WHERE voter = ${email} AND date = ${date}
          `;

        await sql`
      UPDATE users
      SET voted = ${false}
      WHERE email = ${email}
        `;
        console.log({ email, date });
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Vote.' };
    }

    revalidatePath('/dashboard');
    redirect('/dashboard');
}