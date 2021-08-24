const express = require('express');
const server = express();
server.use(express.static('public/dist'));
server.listen(3000, () => console.log('App listening on port 3000!'));
