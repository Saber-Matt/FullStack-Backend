/* eslint-disable no-console */
import client from '../lib/client.js';

// async/await needs to run in a function
run();

async function run() {

  try {

    // run a query to create tables
    await client.query(` 
      CREATE TABLE new_prompts (
        id SERIAL PRIMARY KEY NOT NULL,
        title VARCHAR(512) NOT NULL,
        text VARCHAR(512) NOT NULL,
      );
    
      CREATE TABLE prompts (
        id SERIAL PRIMARY KEY NOT NULL,
        title VARCHAR(512) NOT NULL,
        text VARCHAR(128) NOT NULL,
      );
    `);

    console.log('create tables complete');
  }
  catch(err) {
    console.log(err);
  }
  finally {
    client.end();
  }

} 
