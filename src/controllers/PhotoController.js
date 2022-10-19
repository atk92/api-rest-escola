//-- import Model
const models = require('../models');
//-- Multer --- Upload de fotos
const multer = require('multer');
const multerConfig = require('../config/multerConfig');
const uploads = multer(multerConfig).single('photo');
class PhotoController {

  store( req, res ) {

    return uploads( req, res, async (error) => {
      if (error) {
        res.status(400).json({ errors: [error.code] });
      }

      try {
        const { originalname, filename } = req.file;
        const { alunoId } = req.body;
        const newPhoto = await models.Photos.create({
          originalname, filename, alunoId
        });



        res.json({ sucess: 'Salvo com sucesso !',
      Obj: newPhoto} );

      } catch (e) {
        return res.status(400).json({
          errors: 'Aluno, não existe.'});

      }
    });
  }
}
module.exports = new PhotoController();
