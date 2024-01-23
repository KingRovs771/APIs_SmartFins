const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const morgan = require('morgan');
let = dotenv = require('dotenv').config();

let PORT;
process.env.STATUS === 'development' ? (PORT = process.env.DEV_PORT) : (PORT = process.env.PROD_PORT);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

const routes = require('../routes/routes');
routes(app);

app.use('/auth', require('../middleware/index'));

app.listen(PORT, () => {
  console.log(`Server is Started on port ` + PORT);
});
