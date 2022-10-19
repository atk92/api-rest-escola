const models = require('../models');
const bcrypt = require('bcryptjs');
const jsonwt = require('jsonwebtoken');

class TokenController {
  async store(req, res) {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const user = await models.User.findOne({
      where: { email },
    });



    if (!user) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    async function checkPassword() {
      return await bcrypt.compare(password, user.dataValues.password_hash);
    }

    const resultado = checkPassword();

    if (await checkPassword()) {
      const { id } = user.dataValues;
      const token = jsonwt.sign({ id, email }, process.env.TOKEN_KEY, {
        expiresIn: process.env.TOKEN_EXP,
      });

      return res.json({token: token})
    }

    res.json({errors: 'Senha Inválida !'})
  };
};
module.exports = new TokenController;
