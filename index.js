const express = require('express');
const morgan = require('morgan');

const app = express();
const cors = require('cors');
require('dotenv').config();

const { dbConnection } = require('./db');
const { errorHandler } = require('./middelwares/errorHandler');
const apiRoutes = require('./routes');

// Dev Connection
dbConnection();
app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/api', apiRoutes);
app.use(errorHandler);

// app Start
app.listen(process.env.PORT || 5100, () => console.log('>Server On Fire 5100'));
