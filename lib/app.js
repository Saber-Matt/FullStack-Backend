/* eslint-disable no-console */
import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import cors from 'cors';
import morgan from 'morgan';
import client from './client.js';

const app = express();

app.use(express.json());

app.use(notFoundMiddleware);
app.use(errorMiddleware);

// allow our server to be called from any website
app.use(cors());

// enhanced logging
app.use(morgan('dev'));


// heartbeat route
app.get('/', (req, res) => {
  res.send('Writing Prompts API');
});


// API routes:

app.post('/api/prompts', async (req, res) => {

  const prompt = req.body;
  try {
    const data = await client.query(`
      INSERT INTO prompts (title_id, title, text)
      VALUES ($1, $2, $3)

      RETURNING id, title_id as "titleId", title, text;
      `, [prompt.titleId, prompt.title, prompt.text]);

    // send back the data
    res.json(data.rows[0] || null); 
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });  

    
  }
});

app.get('/api/prompt', async (req, res) => {
  try {
    const data = await client.query(`
      SELECT id, title_id as "titleId", title, text"
      FROM prompts
    `);

    res.json(data.rows);
  }

  catch(err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }

});


export default app;
