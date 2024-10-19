const { db } = require('@vercel/postgres');
const {
  users,
  drink,
  vote,
  system,
  result,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
  try {
    await client.sql`
      DROP TABLE IF EXISTS users;
    `;

    // Create the "users" table if it doesn't exist
    const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        voted BOOLEAN NOT NULL DEFAULT false,
        sum_voted INTEGER NOT NULL DEFAULT 0,
        lastvotereset TEXT NOT NULL
    );
    `;

    console.log(`Created "users" table`);

    // Insert data into the "users" table
    const insertedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
        INSERT INTO users (name, email, password, voted, sum_voted, lastvotereset) 
        VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${user.voted}, ${user.sum_voted}, ${user.lastvotereset})
        ON CONFLICT (email) DO UPDATE
        SET name=${user.name}, email = ${user.email}, password = ${hashedPassword}, voted = ${user.voted}, sum_voted = ${user.sum_voted} ,lastvotereset = ${user.lastvotereset};
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

async function updateUsers(client) {
  try {
    // Loop through each user in the provided users array
    const updatedUsers = await Promise.all(
      users.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        return client.sql`
                    INSERT INTO users (name, email, password, voted, sum_voted, lastvotereset) 
                    VALUES (${user.name}, ${user.email}, ${hashedPassword}, ${user.voted}, ${user.sum_voted}, ${user.lastvotereset})
                    ON CONFLICT (email) DO NOTHING
                `;
      }),
    );

    console.log(`Updated ${updatedUsers.length} users`);

    return {
      updatedUsers,
    };
  } catch (error) {
    console.error('Error updating users:', error);
    throw error;
  }
}

//追加↓
async function seedDrink(client) {
  try {
    await client.sql`
      DROP TABLE IF EXISTS drink CASCADE;
    `;

    // Create the "drink" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS drink (
        id TEXT NOT NULL UNIQUE,
        name VARCHAR(255) NOT NULL,
        japanesename VARCHAR(255) NOT NULL,
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
        ) => client.sql`INSERT INTO drink (id, name, japanesename, voted, price, path, totalvoted)
        VALUES (${drink.id}, ${drink.name}, ${drink.japanesename}, ${drink.voted}, ${drink.price}, ${drink.path}, ${drink.totalvoted})
        ON CONFLICT (id) DO UPDATE
        SET id=${drink.id}, name = ${drink.name}, japanesename = ${drink.japanesename}, voted = ${drink.voted}, price = ${drink.price}, path = ${drink.path}, totalvoted = ${drink.totalvoted} ;
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

async function updateDrink(client) {
  try {
    const updatedDrinks = await Promise.all(
      drink.map(
        (drink) => client.sql`
                    INSERT INTO drink (id, name, japanesename, voted, price, path, totalvoted)
                    VALUES (${drink.id}, ${drink.name}, ${drink.japanesename}, ${drink.voted}, ${drink.price}, ${drink.path}, ${drink.totalvoted})
                    ON CONFLICT (id) DO NOTHING
                `,
      ),
    );

    console.log(`Updated ${updatedDrinks.length} drink data`);

    return {
      updatedDrinks,
    };
  } catch (error) {
    console.error('Error updating drink data:', error);
    throw error;
  }
}

//追加↓
async function seedVote(client) {
  await client.sql`
      DROP TABLE IF EXISTS vote;
    `;

  try {
    // Create the "vote" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS vote (
        voter TEXT NOT NULL,
        drink TEXT NOT NULL REFERENCES drink(id),
        date TEXT NOT NULL,
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

//追加↓
async function seedSystem(client) {
  await client.sql`
      DROP TABLE IF EXISTS system;
    `;

  try {
    // Create the "system" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS system (
        lastTotalization TEXT NOT NULL
    );
`;

    console.log(`Created "system" table`);

    // Insert data into the "system" table
    const insertedSystem = await Promise.all(
      system.map(
        (system) => client.sql`
        INSERT INTO system (lastTotalization)
        VALUES (${system.lastTotalization});
      `,
      ),
    );

    console.log(`Seeded ${insertedSystem.length} system data`);

    return {
      createTable,
      vote: insertedSystem,
    };
  } catch (error) {
    console.error('Error seeding system data:', error);
    throw error;
  }
}

//追加↓
async function seedResult(client) {
  await client.sql`
      DROP TABLE IF EXISTS result;
    `;

  try {
    // Create the "reuslt" table if it doesn't exist
    const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS result (
        date TEXT,
        name TEXT,
        japanesename TEXT,
        price INTEGER,
        path TEXT
    );
`;
    console.log(`Created "result" table`);

    // Insert data into the "result" table
    const insertedResult = await Promise.all(
      result.map(
        (result) => client.sql`
        INSERT INTO result (date, name, japanesename, price, path)
        VALUES (${result.date}, ${result.name}, ${result.japanesename},  ${result.price}, ${result.path});
      `,
      ),
    );

    console.log(`Seeded ${insertedResult.length} result data`);

    return {
      createTable,
      result: insertedResult,
    };
  } catch (error) {
    console.error('Error seeding result data:', error);
    throw error;
  }
}
async function main() {
  const client = await db.connect();

  /*
    await seedUsers(client);
    await seedDrink(client);
    await seedVote(client);
    await seedSystem(client);
    await seedResult(client);
    */

  await updateUsers(client);
  await updateDrink(client);
  await seedResult(client);

  await client.end();
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err,
  );
});
