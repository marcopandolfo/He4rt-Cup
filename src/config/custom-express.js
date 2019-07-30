const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
require('dotenv').config();

// App
const app = express();

// BodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Define path
let rootPath = 'src\\app';
if (process.platform === 'win32') rootPath = 'src/app';

// Consign
consign({ cwd: rootPath })
  .include('infra')
  .then('controllers')
  .into(app);

module.exports = app;
