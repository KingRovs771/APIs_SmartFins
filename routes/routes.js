const { config } = require('../server/index');
const multer = require('multer');
const router = express.Router();

module.exports = function (app) {
  const main = require('../controller/mainController');
  const auth = require('../controller/LoginController');

  //Main Page API
  app.route('/').get(main.indexPage);

  //Auth
  app.route('/auth/v1/register').post(auth.registerUser);
};
