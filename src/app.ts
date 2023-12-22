import express from 'express';
import { router as taskRoutes } from './routes/taskRoutes';

const app = express();
app.use(express.json());
app.use(taskRoutes)

export default app;