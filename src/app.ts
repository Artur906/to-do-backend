import express from 'express';
import { router as taskRoutes } from './routes/taskRoutes';
import { router as userRoutes } from './routes/userRoutes';
import { errorHandler } from './middlewares/errorHandler';
import cors from 'cors';

const app = express();
app.use(cors())
app.use(express.json());
app.use(taskRoutes);
app.use(userRoutes);

app.use(errorHandler);

export default app;