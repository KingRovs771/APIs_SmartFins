const md5 = require('md5');
const mysql = require('mysql');
const connDb = require('../server/index');
const response = require('../config/response');
const config = require('../key/secret');
const jwt = require('jsonwebtoken');
const ip = require('ip');

exports.registerUser = function (req, res) {
  let dataUser = {
    uuid_user: md5(req.body.password),
    nama_user: req.body.nama_user,
    email: req.body.email,
    password: md5(req.body.password),
  };

  let querySelect = 'SELECT * FROM ?? WHERE ??=?';
  let tableSelect = ['user', 'email', dataUser.email];

  let exeQuery = mysql.format(querySelect, tableSelect);

  connDb.query(exeQuery, function (error, rows) {
    if (error) {
      console.log(error);
      res.send('Invalid Server');
    } else {
      if (rows.length == 0) {
        let queryInsert = 'INSERT INTO ?? SET ?';
        let tableInsert = ['user'];

        queryInsert = mysql.format(queryInsert, tableInsert);

        connDb.query(queryInsert, dataUser, function (error, result) {
          if (error) {
            console.log(error);
            res.send('Invalid Server');
          } else {
            res.json({
              Status: 'Success',
              Message: 'Selamat Anda Berhasil Terdaftar di SmartFins',
              Data: {
                nama_user: dataUser.nama_user,
                no_hp: dataUser.no_hp,
                email: dataUser.email,
              },
            });
          }
        });
      } else {
        res.send('Email Sudah Terdaftar');
      }
    }
  });
};

exports.loginUser = function (req, res) {
  let post = {
    email: req.body.email,
    password: req.body.password,
  };

  let queryLogin = 'SELECT * FROM ?? WHERE ??=? AND ??=?';
  let tableLogin = ['user', 'email', post.email, 'password', md5(post.password)];

  queryLogin = mysql.format(queryLogin, tableLogin);

  connDb.query(queryLogin, function (error, rows) {
    if (error) {
      console.log(error);
      res.send('Invalid Server');
    } else {
      if (rows.length == 1) {
        let token = jwt.sign({ rows }, config.secret, {
          expiresIn: '24000000',
        });

        uuid_user = rows[0].uuid_user;

        let expired = 24000000;

        let data = {
          uid_user: uuid_user,
          jsontoken: token,
          ip_address: ip.address(),
        };

        let QueryInsertToken = 'INSERT INTO ?? SET ?';
        let TableInsertToken = ['token_user'];

        QueryInsertToken = mysql.format(QueryInsertToken, TableInsertToken);

        connDb.query(QueryInsertToken, data, function (error, rows) {
          if (error) {
            console.log(error);
            res.send('Invalid Server');
          } else {
            res.json({
              Success: true,
              Message: 'User Logged In',
              Token: token,
              expires: expired,
              uuid_user: data.uid_user,
            });
          }
        });
      } else {
        res.json({
          Error: true,
          Message: 'Email atau Password Salah, Silakan Coba Lagi !!!',
        });
      }
    }
  });
};

exports.checkRoute = function (req, res) {
  const uid_user = req.auth.rows[0].uuid_user;
  res.json({ uid_user });
};

exports.viewDeviceByUser = function (req, res) {
  const uid_user = req.auth.rows[0].uuid_user;
  if (uid_user == null) {
    res.send('ID Device Tidak ditemukan');
  }

  connDb.query('SELECT * FROM device_user WHERE uuid_user =?', [uid_user], function (error, result) {
    if (error) {
      console.log(error);
      res.send(error + ' ---Invalid Server---');
    } else {
      if (result.length == 1) {
        res.json({
          Status: 'Success',
          Message: 'Data Device Berhasil Ditemukan',
          Data: result,
        });
      } else {
        res.json({
          Status: 'Error',
          Message: 'Data Device Tidak Ditemukan',
        });
      }
    }
  });
};

exports.insertDevice = function (req, res) {
  const uid_user = req.auth.rows[0].uuid_user;
  let postData = {
    uuid_device: md5(req.body.uuid_device),
    uuid_user: uid_user,
    nama_kolam: req.body.nama_kolam,
  };

  let queryInsertDevice = 'INSERT INTO ?? SET ?';
  let tableDevice = ['device_user'];

  queryInsertDevice = mysql.format(queryInsertDevice, tableDevice);

  connDb.query(queryInsertDevice, postData, function (error, resultDevice) {
    if (error) {
      console.log(error);
      res.json({
        Status: 'Error',
        Message: 'Data Device Tidak Berhasil Disimpan Silakan Coba Lagi !',
      });
    } else {
      res.json({
        Status: 'Success',
        Message: 'Data Device Berhasil Disimpan !',
        Data: {
          uuid_device: postData.uuid_device,
          nama_kolam: postData.nama_kolam,
        },
      });
    }
  });
};
