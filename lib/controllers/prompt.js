import { Router } from 'express';
import Prompt from '../models/prompts';

export default Router()
  .post('/api/v1/prompts', async (req, res) => {
    try {
      const prompt = await Prompt.insert(req.body);
      res.send(prompt);

    } catch (err) {
      res.status(500).send({ error: err.message });

    }
  });
