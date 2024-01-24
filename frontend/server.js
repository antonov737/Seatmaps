const express = require('express');
const path = require('path');

const app = express();

app.use(
    '/css',
    express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css'))
);

app.use(
    '/font',
    express.static(path.join(__dirname, '../node_modules/bootstrap-icons/font'))
);

app.use(
    '/js',
    express.static(path.join(__dirname, '../node_modules/bootstrap/dist/js'))
);

app.use(
    '/img',
    express.static(path.join(__dirname, './img'))
);

app.use('/static', express.static(path.resolve(__dirname, 'static')));

app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.listen(8090, () => console.log('Frontend server running...'));
