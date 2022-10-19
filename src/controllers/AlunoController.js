const models = require('../models');
const Photos = require('../models/Photos');

const states = {
  erro: [],
  sucesso: [],
  state: false,
}

class AlunoController {


  async index(req, res) {
    const busca = await models.Aluno.findAll();
    return res.json(busca)
  }

  async store (req, res) {
    try{
      const { nome, sobrenome, email, idade, peso, altura } = req.body;

      const novoAluno = await models.Aluno.create({
          nome, sobrenome, email, idade, peso, altura
        });

        return res.json(novoAluno);
      }
      catch(e){
          return res.status(400).json({
            errors: 'revise os dados.',
          });
      }
  }

  async update(req, res) {
    try{
    let  id = req.params.id;
    const pegandoEmail = await models.Aluno.findOne({
      where: { id }
    })


      const { nome, sobrenome, email, idade, peso, altura } = req.body;
      console.log( `awaitiiiiii ${  Object.keys(pegandoEmail.dataValues)}`)

      const atualizado = await models.Aluno.update({
        nome, sobrenome, email, idade, peso, altura
      }, {
        where: {
          id: id
        }
      });
      return res.json({sucess: 'atualizou com sucesso',
    nome, sobrenome, email, idade, peso, altura });

    }
    catch(e){
      res.json({errors: 'deu ruim em...'});

       return
      }
  }

  async delete(req, res) {
    const { id } = req.params;

    if(!req.params.id) {
      return res.status(400).json({errors: 'ID não enviado !'});
    }
    const busca = await models.Aluno.findByPk(id);
    if (!busca) { return res.status(400).json({
      errors: 'Usuário não existe.'
    });}

    const destroed = await models.Aluno.destroy({
      where:{
        id: id
      }
    });

    return res.json(busca);
  }

  async show(req, res) {
    const { id } = req.params;
    const buscaTodos = await models.Aluno.findByPk(id, {
      include: {
        association: 'photos'
      }
    });

    return res.json({buscaTodos});}
}

module.exports = new AlunoController;
