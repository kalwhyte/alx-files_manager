import express from 'express';
import http from 'http';
import routes from './routes/index';

const app = express();
app.use(express.json());
app.use('/', routes);

const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log('listening on port', PORT);
});
