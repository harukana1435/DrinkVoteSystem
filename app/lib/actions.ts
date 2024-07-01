'use server';

import { number, z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import {
    fetchDrinkExist,
    fetchDrinkNum,
    fetchSelectDrink,
    VoteExist,
} from './data';

const FormSchema = z.object({
    email: z.string(),
    drink: z.string(),
    voted: z.coerce.boolean(),
    date: z.string(),
});

const FormResultSchema = z.object({
    name: z.string(),
    price: z.number(),
});

const CreateVote = FormSchema.omit({ date: true });

const UpdateVote = FormSchema.omit({ date: true });

const DeleteVote = FormSchema.omit({ drink: true, date: true });

const UpdateResult = FormResultSchema;

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
    redirect('/dashboard');
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
            message: 'You has voted already',
        };
    }

    try {
        if ((await fetchDrinkExist(drink)) == false) {
            return {
                message: 'You has voted already',
            };
        }

        await sql`
            INSERT INTO vote (voter, drink, date)
            VALUES (${email}, ${drink}, ${date})
        `;

        await sql`
    UPDATE users
    SET voted = ${true}, sum_voted = sum_voted + 1
    WHERE email = ${email}
      `;

        await sql`
    UPDATE drink
    SET voted = voted + 1, totalvoted = totalvoted +1
    WHERE id = ${drink}
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
    redirect('/dashboard?search=');
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
            message: 'You has not voted yet',
        };
    }

    try {
        if ((await VoteExist(email, date)) == false) {
            return {
                message: 'no drink',
            };
        }

        const selectedDrink = await fetchSelectDrink(email, date);

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

        await sql`
      UPDATE drink
      SET voted = voted + 1, totalvoted = totalvoted + 1
      WHERE id = ${drink}
       `;

        await sql`
       UPDATE drink
       SET voted = voted - 1, totalvoted = totalvoted - 1
       WHERE id = ${selectedDrink.drink}
        `;
        console.log({ email, drink, date });
    } catch (error) {
        return { message: 'Database Error: Failed to Update Vote.' };
    }

    revalidatePath('/dashboard');
    redirect('/dashboard?search=');
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
            message: 'You has not voted yet',
        };
    }

    try {
        if ((await VoteExist(email, date)) == false) {
            return {
                message: 'no drink',
            };
        }

        const selectedDrink = await fetchSelectDrink(email, date);

        await sql`
    DELETE FROM vote
    WHERE voter = ${email} AND date = ${date}
          `;

        await sql`
      UPDATE users
      SET voted = ${false}, sum_voted = sum_voted+1
      WHERE email = ${email}
        `;

        await sql`
    UPDATE drink
    SET voted = voted - 1, totalvoted = totalvoted -1
    WHERE id = ${selectedDrink.drink}
     `;

        console.log({ email, date });
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Vote.' };
    }

    revalidatePath('/dashboard');
    redirect('/dashboard?search=');
}

export async function addVoteEveryTwoWeeks() {
    try {
        await sql`
            UPDATE drink
            SET totalvoted = totalvoted + voted
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to add vote every two weeks' };
    }
}

export async function deleteVoteEveryTwoWeeks() {
    try {
        await sql`
            UPDATE drink
            SET voted = 0
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to delete vote every two weeks' };
    }
}

export async function updateresult(
    _name: string,
    _price: number,
) {

    // Validate form fields using Zod
    const validatedFields = UpdateResult.safeParse({
        name: _name,
        price: _price,
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Update Result.',
        };
    }

    // Prepare data for insertion into the database
    const { name, price } = validatedFields.data;
    const date = new Date(Date.now() + ((new Date().getTimezoneOffset() + (540)) * 60 * 1000)).toISOString().split('T')[0]; //日本時間で日付を取得

    try {
        await sql`
            INSERT INTO result (date, name, price)
            VALUES (${date}, ${name}, ${price})
        `;
    } catch (error) {
        return { message: 'Database Error: Failed to update result' };
    }
}