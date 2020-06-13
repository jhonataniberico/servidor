const mysql = require('mysql');
const {promisify} = require('util');

const { databases } = require('./keys');
const pool1 = mysql.createPool(databases.Database1);
const pool2 = mysql.createPool(databases.Database2);

pool1.getConnection((err,connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS')
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');            
        }
    }
    if(connection) connection.release();
    console.log('DB is connected 1');    
    return;
});


pool2.getConnection((err,connection)=>{
    if(err){
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            console.error('DATABASE CONNECTION WAS CLOSED');
        }
        if(err.code === 'ER_CON_COUNT_ERROR'){
            console.error('DATABASE HAS TO MANY CONNECTIONS')
        }
        if(err.code === 'ECONNREFUSED'){
            console.error('DATABASE CONNECTION WAS REFUSED');            
        }
    }
    if(connection) connection.release();
    console.log('DB is connected 2');    
    return;
});
//promisify pool querys -- conirtiendo a promesas los callbacks
pool1.query = promisify(pool1.query);
pool2.query = promisify(pool2.query);

module.exports = {pool1, pool2};