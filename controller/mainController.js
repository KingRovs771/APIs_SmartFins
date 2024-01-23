const response = require('../config/response');
const dbexec = require('../server/index');
const mysql = require('mysql');

exports.indexPage = function (req, res) {
  response.success('REST API MuhApps', res);
};

exports.insertSensor = function (req, res) {
  let dataSensor = {
    uuid_device: req.body.uuid_device,
    sensor_oksigen: req.body.sensor_oksigen,
    sensor_suhu: req.body.sensor_suhu,
    sensor_ph: req.body.sensor_ph,
  };

  let queryInsertSensor = 'INSERT INTO ?? SET ?';
  let tableSensor = ['sensor'];

  queryInsertSensor = mysql.format(queryInsertSensor, tableSensor);

  dbexec.query(queryInsertSensor, dataSensor, function (error, result) {
    if (error) {
      console.log(error);
      res.send('Invalid Server Error');
    } else {
      res.json(
        {
          message: 'Data Berhasil Disimpan',
          data: result,
        },
        res
      );
    }
  });
};
