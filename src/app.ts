import express from 'express';

import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import apiV1 from './router/api.v1';

const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());

app.use('/api/v1', apiV1);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;