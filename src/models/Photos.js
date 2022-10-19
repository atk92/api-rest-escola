const Aluno = require('../models/Aluno');
const cfgApp = require('../config/appConfig');
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class Photos extends Model {
    static associate(models) {

      Photos.belongsTo(models.Aluno, { foreignKey: 'alunoId', as: 'alunos' });

    };
  };

  Photos.init({

    originalname: {
      type: DataTypes.STRING,
      defaultValue: '',
    },

    filename: {
      type: DataTypes.STRING,
      defaultValue: '',
      unique: {
        msg: 'foto já existe...',
      },
    },
    url: {
      type: DataTypes.VIRTUAL,
      get() {
        return `${cfgApp.url}/images/${this.getDataValue('filename')}`
      }
    },

    alunoId: {
      type: DataTypes.INTEGER,
    },

  }, {
    sequelize,
    modelName: 'Photos',
  });

  return Photos;
};


