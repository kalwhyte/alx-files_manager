const express = require('express');
const dotenv = require('dotenv');
const routes = require('./routes');

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use('/', routes);

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
