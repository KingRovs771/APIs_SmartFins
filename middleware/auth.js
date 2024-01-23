const md5 = require('md5');
const mysql = require('mysql');
const connDb = require('../server/index');
const { response } = require('../config/response');
const config = require('verifikasi');
const jwt = require('jsonwebtoken');
const ip = require('ip');

exports.registerUser = function (req, res) {
  let dataUser = {
    uuid_user: md5(req.body.nama_user),
    nama_user: req.body.nama_user,
    no_hp: req.body.no_hp,
    alamat: req.body.alamat,
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

        exeQueryInsert = mysql.format(queryInsert, tableInsert);

        connDb.query(exeQuery, dataUser, function (error, rows) {
          if (error) {
            console.log(error);
            res.send('Invalid Server');
          } else {
            res.json(
              {
                Status: 'Success',
                Message: 'Data Berhasil Disimpan',
                Data: rows,
              },
              res
            );
          }
        });
      } else {
        response.success('Email Sudah Terdaftar', res);
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

exports.viewSensor = function (req, res) {
  const uuid_device = req.params.uuid_device;
  const uuid_user = req.auth.rows[0].uuid_user;
  if (uuid_device == null) {
    res.send('ID Device Tidak ditemukan');
  }

  dbexec.query('SELECT * FROM sensor WHERE uuid_device =? AND uuid_user =?', [uuid_device, uuid_user], function (error, result) {
    if (error) {
      console.log(error);
      res.send(error + ' ---Invalid Server---');
    } else {
      response.success(
        {
          Status: 'done',
          Message: 'Data Berhasil ditemukan',
          Data: result,
        },
        res
      );
    }
  });
};
