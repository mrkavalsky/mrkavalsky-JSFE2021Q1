import express from 'express';
import path from 'path';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static(path.resolve(__dirname, '../static')));

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}...`);
});
