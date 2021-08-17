
/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import prompts from './prompts.js';

run();

async function run() {

  try {

    await Promise.all(
      prompts.map(prompt => {
        return client.query(`
          INSERT INTO prompts (title, text)
          VALUES ($1, $2)
          RETURNING *;
        `,
        [prompt.title, prompt.text]);
      })
    );

    console.log('seed data load complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }

}
