const client = require('../lib/client');
const { getEmoji } = require('../lib/emoji.js');

// async/await needs to run in a function
run();

async function run() {

  try {
    // initiate connecting to db
    await client.connect();
    console.log('hello');
    // run a query to create tables
    await client.query(`
                CREATE TABLE users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(256) NOT NULL,
                    username VARCHAR(256) NOT NULL,
                    email VARCHAR(256) NOT NULL,
                    last_login TIMESTAMP DEFAULT NOW(),
                    password VARCHAR(512) NOT NULL,
                    security_q VARCHAR(256) NOT NULL,
                    security_a VARCHAR(256) NOT NULL

                );           
                CREATE TABLE exercises (
                    id SERIAL PRIMARY KEY NOT NULL,
                    title VARCHAR(56) NOT NULL,
                    category VARCHAR(256) NOT NULL,
                    prompt VARCHAR(2000) NOT NULL
                )
        `);

    console.log('create tables complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    // problem? let's see the error...
    console.log(err);
  }
  finally {
    // success or failure, need to close the db connection
    client.end();
  }

}
