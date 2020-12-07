
const mysql516 = require('mysql2');

db516 = new Promise(function(resolve, reject){
    // use `sql` connection as usual
    connection516 = mysql516.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'Krutin@47',
        port     : '3306',
        database : 'mydb'
    });

    // send connection back in variable depending on success or not
    connection516.connect(function(err){
        console.log(err);
        if (err) {
            reject(err);
        } else {
            resolve(connection516);
        }
        console.log('MySql Connected');
    });
});

module.exports = db516;
