require('dotenv').config()
const config = require('./config');
const db = require('./models')
const express = require('express');
const uploadRouters = require('./routes/upload');

const app = express();

app.use(express.json());
app.use('/upload', uploadRouters)

app.use('*', (req, res) => {
    res.status(404).send('not found')
});

;(async function () {
    await db.sequelize.authenticate()
    await db.sequelize.sync({force: true})
    console.log('[Node Process] PostgreSQL is connected...');

    app.listen(config.PORT, () => {
        console.log(`[Node Process] Server is up on ${config.PORT} ...`);
    });
})()
