const { db } = require('@vercel/postgres');
const { users, drink, vote } = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        voted BOOLEAN NOT NULL,
        sum_voted INTEGER NOT NULL DEFAULT 0
    );
    `;

        console.log(`Created "users" table`);

        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
        INSERT INTO users (name, email, password, voted, sum_voted) 
        VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${user.voted}, ${user.sum_voted})
        ON CONFLICT (email) DO UPDATE
        SET name=${user.name}, email = ${user.email}, password = ${hashedPassword}, voted = ${user.voted}, sum_voted = ${user.sum_voted} ;
    `;
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

//追加↓
async function seedDrink(client) {
    try {
        // Create the "drink" table if it doesn't exist
        const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS drink (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        voted INTEGER NOT NULL DEFAULT 0,
        price DECIMAL(10, 2) NOT NULL,
        path TEXT NOT NULL,
        totalvoted INTEGER NOT NULL DEFAULT 0
    );
`;

        console.log(`Created "drink" table`);

        // Insert data into the "drink" table
        const insertedDrink = await Promise.all(
            drink.map(
                (
                    drink,
                ) => client.sql`INSERT INTO drink (id, name, voted, price, path, totalvoted)
        VALUES (${drink.id}, ${drink.name}, ${drink.voted}, ${drink.price}, ${drink.path}, ${drink.totalvoted})
        ON CONFLICT (id) DO UPDATE
        SET id=${drink.id}, name = ${drink.name}, voted = ${drink.voted}, price = ${drink.price}, path = ${drink.path}, totalvoted = ${drink.totalvoted} ;
      `,
            ),
        );

        console.log(`Seeded ${insertedDrink.length} drink data`);

        return {
            createTable,
            drink: insertedDrink,
        };
    } catch (error) {
        console.error('Error seeding drink data:', error);
        throw error;
    }
}

//追加↓
async function seedVote(client) {
    try {
        // Create the "vote" table if it doesn't exist
        const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS vote (
        voter TEXT NOT NULL,
        drink TEXT NOT NULL REFERENCES drink(id),
        date TIMESTAMP NOT NULL,
        CONSTRAINT unique_voter_date UNIQUE (voter, date)
    );
`;

        console.log(`Created "vote" table`);

        // Insert data into the "vote" table
        const insertedVote = await Promise.all(
            vote.map(
                (vote) => client.sql`
        INSERT INTO vote (voter, drink, date)
        VALUES (${vote.voter}, ${vote.drink}, ${vote.date})
        ON CONFLICT (voter, date) DO UPDATE
        SET voter = ${vote.voter}, drink = ${vote.drink}, date = ${vote.date};
      `,
            ),
        );

        console.log(`Seeded ${insertedVote.length} vote data`);

        return {
            createTable,
            vote: insertedVote,
        };
    } catch (error) {
        console.error('Error seeding vote data:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedDrink(client);
    await seedVote(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
