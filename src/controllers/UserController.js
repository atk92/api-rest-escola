const models = require('../models');
const jsonwt = require("jsonwebtoken");
const bcryptjs = require('bcryptjs');
const states = {
  erro: [],
  sucesso: [],
  state: false,
}

class UserController {
  index(req, res) {
    res.json({ OK: true });
  }

  async index(req, res) {
    const buscaTodos = await models.User.findAll();

    return res.json(buscaTodos);
  }

  async store(req, res) {
    try {

      const { nome, email, password, } = req.body;
      const newData = await models.User.create({
        nome, email, password,
      });

      return res.json({sucess: ['Usuário criado com sucesso !']});
    }
    catch (e) {
      return res.json({errors: ['Este e-mail já existe !']})
    }
  }

  async update(req, res) {
    try {
      const { authorization } = req.headers;
      const id = req.userId;
      const [, token] = authorization.split(' ');
      let dados = jsonwt.verify(token, process.env.TOKEN_KEY);
      const { nome, email, password, } = req.body;
      if ( id ) {
        const atualizado = await models.User.update({
          nome, email, password_hash: await bcryptjs.hash(password, 8),
        }, {
          where: {
            id,
          }
        });
        return res.json({atualizado, id, nome, email, password});
      }
      else {
        states.erro.push('Falta informações para atualizar esta tabela.');
        return res.json(states.erro)
      }
    }
    catch (e) {
      return res.json({
        errors: ['falta id'],
    });
    }
  }

  async delete(req, res) {
    const { authorization } = req.headers;

  const [, token] = authorization.split(' ');


  let dados = jsonwt.verify(token, process.env.TOKEN_KEY);

  const { id } = dados;

    const busca = await models.User.findByPk(id);

    const destroed = await models.User.destroy({
      where: {
        id: id
      },
    });

    return res.json(busca);
  }

  async show(req, res) {
    const { id } = req.params;

    const busca = await models.User.findByPk(id);

    return res.json(busca);
  }
}

module.exports = new UserController;
