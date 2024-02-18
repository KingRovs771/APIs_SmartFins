const response = require('../config/response');
const dbexec = require('../server/index');
const mysql = require('mysql');

exports.indexPage = function (req, res) {
  response.success('REST API SmartFins', res);
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
      res.json({
        Status: 'Error',
        Values: 'Data Tidak Berhasil di Simpan ke Database Silakan Coba Lagi !!',
      });
    } else {
      res.json({
        message: 'Data Berhasil Disimpan',
        Data: {
          uuid_device: dataSensor.uuid_device,
          sensor_oksigen: dataSensor.sensor_oksigen,
          sensor_suhu: dataSensor.sensor_suhu,
          sensor_ph: dataSensor.sensor_ph,
          Hasil: result,
        },
      });
    }
  });
};

exports.getSensorByDeviceId = function (req, res) {
  const uuid_device = req.params.uuid_device;

  dbexec.query('SELECT * FROM sensor WHERE uuid_sensor=? ORDER BY created_at DESC LIMIT 1', [uuid_device], function (error, result) {
    if (error) {
      console.log(error);
      res.send('Invalid Server');
    } else {
      res.json({
        Status: 'Success',
        Message: 'Berhasil Mendapatkan Data',
        Data: result,
      });
    }
  });
};

exports.deleteDevice = function (req, res) {
  const uuid_device = req.params.uuid_device;

  if (uuid_device) {
    dbexec.query('DELETE FROM device_user WHERE ??=?', ['uuid_device', uuid_device], function (error, result) {
      if (error) {
        console.log(error);
        res.send('Invalid Server Error');
      } else {
        res.json({
          Status: 'Success',
          Message: 'Data Berhasil Dihapus',
          Data: {
            uuid_device: uuid_device,
          },
        });
      }
    });
  }
};
