import express from 'express';
import path from 'path';
import { ROUTER } from './routes';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, '../static')));
app.use(ROUTER);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
