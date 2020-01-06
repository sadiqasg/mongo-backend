const http = require('http');
const app = require('./app');
const port = process.env.PORT || '3000';

const server = http.createServer(app);

server.on('listening', () => {
  const address = server.address();
  console.log(`Listening on port ${port}`);
});

server.listen(port);
