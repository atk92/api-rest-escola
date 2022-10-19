const dotenv = require('dotenv');
dotenv.config();
const { resolve } = require('path');
const express = require('express');

//-- Import Routas
const alunoRoutes = require('./src/routes/alunoRoutes');
const userRoutes = require('./src/routes/userRoutes');
const tokenRoutes = require('./src/routes/tokenRoutes');
const photoRoutes = require('./src/routes/photoRoutes');

//-- Import Middlewares


class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, 'src', 'uploads')))
  }

  routes() {
    this.app.use('/aluno', alunoRoutes);
    this.app.use('/user', userRoutes);
    this.app.use('/tokens', tokenRoutes);
    this.app.use('/photo', photoRoutes);
  }
}

module.exports = new App().app;
