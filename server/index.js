const mysql = require('mysql');
require('dotenv').config();

const connDb = mysql.createConnection({
  host: '34.101.161.28',
  user: 'root',
  password: 'SolidState162', // Ganti dengan password MySQL Anda
  database: 'smartfins_api',
});

connDb.connect((err) => {
  if (err) {
    console.error('Koneksi Ke Database Gagal' + err.stack);
    return;
  }
  console.log('Terhubung ke Database dengan ID' + connDb.threadId);
});

module.exports = connDb;
