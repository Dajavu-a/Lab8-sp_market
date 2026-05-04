const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');
const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'nodlab8' 
});

db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database nodlab8');
});
global.db = db;


app.set('port', process.env.port || port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 


const indexRoutes = require('./routes/index.routes');
const productRoutes = require('./routes/product.routes');

app.use('/', indexRoutes);
app.use('/product', productRoutes);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});