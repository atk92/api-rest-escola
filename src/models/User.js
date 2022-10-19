'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {

    };
  };

  User.init({
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

    password: {
      type: DataTypes.VIRTUAL,
      defaultValue: '',
      validate: {
        len: {
          args: [6, 50],
          msg: 'A senha precisa ter entre 6 e 50 caracteres',
        },
      },
    },
    password_hash: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
  }, {
    sequelize,
    modelName: 'User',
  });


    User.addHook('beforeSave', async user => {
      user.password_hash = await bcrypt.hash(user.password, 8);
  });
  

  return User;

};


