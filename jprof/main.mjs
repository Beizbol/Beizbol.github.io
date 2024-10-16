import { createServer } from 'node:http';

const server = createServer((req, res) => {
    console.log(`Node: ${req.method} ${req.url}`);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World!\n');
});

server.listen(4203, '127.0.0.1', () => {
    console.log('Node serving port 4203');
});

// npm run .