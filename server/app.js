const express = require('express');
const router = require('./routers/index');
const cors = require('cors');
const {errorHandler} = require('./errorHandler');
const {STATIC_PATH} = require('./config/path.config');

const app = express();

app.use(cors())
app.use(express.json());
app.use(express.static(STATIC_PATH));
app.use('/api',router);
app.use(errorHandler);

module.exports = app