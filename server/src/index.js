// Environment variables
if(process.env.NODE_ENV === 'development'){
    require('dotenv').config();
}

console.log(process.env.MONGODB_URI);
const cors = require("cors");

const express = require('express');
const morgan = require('morgan');
const multer = require('multer');
const path = require('path');

// Inicializations
const app = express();
app.use(cors());

// Settings
app.set('port', process.env.PORT || 4000);

// Midlewares
app.use(morgan('dev'));
const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename(req, file, cb){
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
})
app.use(multer({storage}).single('image'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes, definimos las urls de nuestro servidor
app.use('/testing',require('./routes/testingRoutes'));
app.use('/user',require('./routes/userRoutes'));
app.use('/admin',require('./routes/adminRoutes'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Start the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});