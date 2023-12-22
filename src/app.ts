import express from 'express';
import { router as taskRoutes } from './routes/taskRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json());
app.use(taskRoutes)

app.use(errorHandler);

export default app;