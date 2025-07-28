import express from 'express';
import { sequelize } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import apiV1 from './router/api.v1';

const app = express();
app.use(express.json());

app.use('/api/v1', apiV1);

app.use(notFoundHandler);
app.use(errorHandler);

sequelize.sync().then(() => {
  console.log('✅ Database synced');
});
export default app;