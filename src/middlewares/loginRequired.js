const jsonwt = require("jsonwebtoken");
const models = require('../models');
module.exports = async function loginRequired(req, res, next,) {

  const { authorization } = req.headers;
  if(!authorization) {
    return res.status(401).json({errors: ['Login Required']});
  }

  const [, token] = authorization.split(' ');

  try{
    let dados = jsonwt.verify(token, process.env.TOKEN_KEY);

    let {id, email } = dados;

    const user = await models.User.findOne({
      where: {
        id, email
      }
    });

    if(!user) {
      return res.json({errors: 'usuario invalido meu nobre'});
    }

    req.userId = id;
    req.userEmail = email;

    return next();



  }
  catch(e){
    res.status(401).json({
      errors: ['Token expirado ou inválido x_x'],
    })
  }

};
