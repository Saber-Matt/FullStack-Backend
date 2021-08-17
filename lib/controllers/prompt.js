import { Router } from 'express';
import Prompt from '../models/Prompts';

export default Router()
  .post('/api/v1/prompts', async (req, res) => {
    try{
      const prompt = await Prompt.insert(req.body);
      res.send(prompt);

    } catch(err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/prompts', async (req, res) => {
    try{
      const prompt = await Prompt.findAll();
      res.send(prompt);

    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .get('/api/v1/prompts/:id', async(req, res) => {
    try {
      const prompt = await Prompt.findById(req.params.id);
      res.send(prompt);

    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .put('/api/v1/prompts/:id', async(req, res) => {
    try{
      const prompt = await Prompt.update(req.body, req.params.id);
      res.send(prompt);

    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  })

  .delete('/api/v1/prompts/:id', async(req, res) => {
    try{
      const prompt = await Prompt.delete(req.params.id);
      res.send(prompt);

    } catch (err) {
      res.status(500).send({ error: err.message });
    }
  }) 
;
