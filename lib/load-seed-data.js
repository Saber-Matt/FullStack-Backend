
/* eslint-disable no-console */
import client from '../lib/client.js';
// import our seed data:
import prompts from './prompts.js';

run();

async function run() {

  try {

    const data = await Promise.all(
      newPropmt.map(user => {
        return client.query(`
          INSERT INTO new_prompt (title, text)
          VALUES ($1, $2)
          RETURNING *;
        `,
        [newPropmt.title, newPrompt.text]);
      })
    );

    const user = data[0].rows[0];

    await Promise.all(
      prompts.map(prompt => {
        return client.query(`
        INSERT INTO prompts (title, text)
        VALUES ($1, $2)
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
