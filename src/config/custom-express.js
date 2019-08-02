const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// App
const app = express();

// CORS
app.use(cors());

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define path
let rootPath = 'src\\app';
if (process.platform === 'linux') rootPath = 'src/app';

// Consign
consign({ cwd: rootPath })
  .include('infra')
  .then('Dao')
  .then('controllers')
  .into(app);

module.exports = app;
