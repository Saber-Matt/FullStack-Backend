import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import promptController from './controllers/prompt.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.get('/', (req, res) => {res.send('hello');});

app.use(promptController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
