import app from './app';
import { config } from './config/config';

app.listen(config.port, () => {
  console.log('🚀 Server running on http://localhost:3000');
});