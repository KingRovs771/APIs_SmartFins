const mysql = require('mysql');
require('dotenv').config();

const connDb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'LikaRovs771@', // Ganti dengan password MySQL Anda
  database: 'smartfins',
});

connDb.connect((err) => {
  if (err) {
    console.error('Koneksi Ke Database Gagal' + err.stack);
    return;
  }
  console.log('Terhubung ke Database dengan ID' + connDb.threadId);
});

module.exports = connDb;
