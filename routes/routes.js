const { config } = require('../server/index');
const multer = require('multer');

module.exports = function (app) {
  const main = require('../controller/mainController');

  //Main Page API
  app.route('/api/smartfins').get(main.indexPage);
  app.route('/api/smartfins/insertSensor').post(main.insertSensor);
  app.route('/api/smartfins/getSensor/:uuid_device').get(main.getSensorByDeviceId);
  app.route('/api/smartfins/deleteDevice/:uuid_device').delete(main.deleteDevice);
};
