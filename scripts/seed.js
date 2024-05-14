const { db } = require('@vercel/postgres');
const {
    invoices,
    customers,
    revenue,
    users,
    drink,
    vote,
} = require('../app/lib/placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the "users" table if it doesn't exist
        const createTable = await client.sql`
        CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );
    `;

        console.log(`Created "users" table`);

        // Insert data into the "users" table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
        INSERT INTO users (id, name, email, password, voted, sum_voted) 
        VALUES (${user.id}, ${user.name}, ${user.email}, ${hashedPassword}, ${user.voted}, ${user.sum_voted})
        ON CONFLICT (id) DO UPDATE
        SET id = ${user.id}, name = ${user.name}, email = ${user.email}, password = ${hashedPassword}, voted = ${user.voted}, sum_voted = ${user.sum_voted};
    `;
            }),//UPDATEもできるようにした
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

async function seedInvoices(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "invoices" table if it doesn't exist
        const createTable = await client.sql`
    CREATE TABLE IF NOT EXISTS invoices (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    customer_id UUID NOT NULL,
    amount INT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date DATE NOT NULL
  );
`;

        console.log(`Created "invoices" table`);

        // Insert data into the "invoices" table
        const insertedInvoices = await Promise.all(
            invoices.map(
                (invoice) => client.sql`
        INSERT INTO invoices (customer_id, amount, status, date)
        VALUES (${invoice.customer_id}, ${invoice.amount}, ${invoice.status}, ${invoice.date})
        ON CONFLICT (id) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${insertedInvoices.length} invoices`);

        return {
            createTable,
            invoices: insertedInvoices,
        };
    } catch (error) {
        console.error('Error seeding invoices:', error);
        throw error;
    }
}

async function seedCustomers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the "customers" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS customers (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        image_url VARCHAR(255) NOT NULL
      );
    `;

        console.log(`Created "customers" table`);

        // Insert data into the "customers" table
        const insertedCustomers = await Promise.all(
            customers.map(
                (customer) => client.sql`
        INSERT INTO customers (id, name, email, image_url)
        VALUES (${customer.id}, ${customer.name}, ${customer.email}, ${customer.image_url})
        ON CONFLICT (id) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${insertedCustomers.length} customers`);

        return {
            createTable,
            customers: insertedCustomers,
        };
    } catch (error) {
        console.error('Error seeding customers:', error);
        throw error;
    }
}

async function seedRevenue(client) {
    try {
        // Create the "revenue" table if it doesn't exist
        const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS revenue (
        month VARCHAR(4) NOT NULL UNIQUE,
        revenue INT NOT NULL
      );
    `;

        console.log(`Created "revenue" table`);

        // Insert data into the "revenue" table
        const insertedRevenue = await Promise.all(
            revenue.map(
                (rev) => client.sql`
        INSERT INTO revenue (month, revenue)
        VALUES (${rev.month}, ${rev.revenue})
        ON CONFLICT (month) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${insertedRevenue.length} revenue`);

        return {
            createTable,
            revenue: insertedRevenue,
        };
    } catch (error) {
        console.error('Error seeding revenue:', error);
        throw error;
    }
}

//追加↓
async function seedDrink(client) {
    try {
        // Create the "revenue" table if it doesn't exist
        //     const createTable = await client.sql`
        //   CREATE TABLE IF NOT EXISTS drink (
        //     month VARCHAR(4) NOT NULL UNIQUE,
        //     revenue INT NOT NULL
        //   );
        // `;

        // console.log(`Created "revenue" table`);

        // Insert data into the "revenue" table
        const insertedDrink = await Promise.all(
            drink.map(
                (
                    drink,
                ) => client.sql`INSERT INTO drink (id, name, exist, voted, price, path)
        VALUES (${drink.id}, ${drink.name}, ${drink.exist}, ${drink.voted}, ${drink.price}, ${drink.path})
        ON CONFLICT (id) DO UPDATE
        SET name = ${drink.name}, exist = ${drink.exist}, voted = ${drink.voted}, price = ${drink.price}, path = ${drink.path};
      `,
            ),
        );

        console.log(`Seeded ${insertedDrink.length} drink data`);

        return {
            //createTable,
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
        // Create the "revenue" table if it doesn't exist
        //     const createTable = await client.sql`
        //   CREATE TABLE IF NOT EXISTS drink (
        //     month VARCHAR(4) NOT NULL UNIQUE,
        //     revenue INT NOT NULL
        //   );
        // `;

        // console.log(`Created "revenue" table`);

        // Insert data into the "revenue" table
        const insertedVote = await Promise.all(
            vote.map(
                (vote) => client.sql`
        INSERT INTO vote (id, name, drink, voting)
        VALUES (${vote.id}, ${vote.name}, ${vote.drink}, ${vote.voting})
        ON CONFLICT (id) DO NOTHING;
      `,
            ),
        );

        console.log(`Seeded ${insertedVote.length} vote data`);

        return {
            //createTable,
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
    await seedCustomers(client);
    await seedInvoices(client);
    await seedRevenue(client);
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
