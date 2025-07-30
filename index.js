const express = require('express');
const app = express();

const loaders = require('./loaders');

const PORT = require('./config').PORT;

async function startServer() {
    app.get('/', (req, res) => res.status(200).send('OK'));

    loaders(app);

    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}.`);
    });
}

startServer();