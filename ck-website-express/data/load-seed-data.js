const client = require('../lib/client');
// import our seed data:
const usersData = require('./users.js');
const exercises = require('./exercises.js');
const { getEmoji } = require('../lib/emoji.js');

run();

async function run() {

  try {
    await client.connect();

    await Promise.all(
      usersData.map(user => {
        return client.query(`
                      INSERT INTO users (name, username, email, last_login, password, security_q, security_a)
                      VALUES ($1, $2, $3, $4, $5, $6, $7)
                      RETURNING *;
                  `,
        [user.name, user.username, user.email, user.last_login, user.password, user.security_q, user.security_a]);
      })
    );
      
    
    await Promise.all(
      exercises.map(exercise => {
        return client.query(`
                    INSERT INTO exercises (title, category, prompt)
                    VALUES ($1, $2, $3);
                `,
        [exercise.title, exercise.category, exercise.prompt]);
      })
    );

    

    console.log('seed data load complete', getEmoji(), getEmoji(), getEmoji());
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }
    
}
