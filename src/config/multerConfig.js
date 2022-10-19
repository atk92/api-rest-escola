const multer = require('multer');
const { extname, resolve } = require('path');


function aleatorio() {
  return Math.floor(Math.random() * 10000)
}


module.exports = {
  fileFilter: (req, file, cb) => {

    if(file.mimetype != 'image/png' && file.mimetype != 'image/jpeg') {
      console.log(file)
      return cb(new multer.MulterError('Arquivo precisa ser .PNG ou .JPGE'));
    }

    return cb(null, true);

  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'src' ,'uploads', 'images'),)
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`)
    },
  }),

}
