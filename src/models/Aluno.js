'use strict';
const models = require('../models');
const {
  Model
} = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Aluno extends Model {

    static associate(models) {
      Aluno.hasMany(models.Photos, { foreignKey: 'alunoId', as: 'photos' });
    }
  }

  Aluno.init({
    nome: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 50],
          msg: 'Obs: Nome precisa ter de 3 a 50 caracteres !',
        },
      },
    },
    sobrenome: {
      type: DataTypes.STRING,
      defaultValue: '',
      validate: {
        len: {
          args: [3, 50],
          msg: 'Obs: Sobrenome precisa ter de 3 a 50 caracteres !',
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      defaultValue: '',
      unique: {
        msg: 'E-mail, já existe !',
      },
      validate: {
        isEmail: {
          msg: 'Obs: E-mail, precisa ser valido !',
        },
      },
    },
    idade: DataTypes.INTEGER,
    peso: DataTypes.FLOAT,
    altura: DataTypes.FLOAT,
  }, {
    sequelize,
    modelName: 'Aluno',
  });
  return Aluno;
};

