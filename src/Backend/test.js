const http = require('http');

const server = http.createServer((req, res) => {
    const ip = req.socket.remoteAddress;
    res.end(`Your IP address is ${ip}`);
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});
