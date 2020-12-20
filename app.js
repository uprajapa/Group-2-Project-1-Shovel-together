const express = require('express');
var cors = require('cors')
var database = require('./utils/database');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("./config/keys");

const bodyParser = require('body-parser');

var app = express();

app.use(cors())
// app.use(express.json());

app.use(bodyParser.urlencoded({ extended:false}))
app.use(bodyParser.json())

// defining routes l
// const JobRoute = require('./routes/profileManagement');
// app.use('/', JobRoute);

const port = process.env.PORT || 5000;

// Register a User
app.post('/add', (req, res) => {

    if (!req.body.name.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Name input is wronge..!'}));
    if (!req.body.email.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Email-ID input is wronge..!'}));
    if (!req.body.password.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Password input is wronge..!'}));
    if (!req.body.address.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Topic input is wronge..!'}));
    if (!req.body.contact.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Topic input is wronge..!'}));

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const address = req.body.address;
    const contact = req.body.contact;
    const shovel = req.body.shovel;

    //checking if any User post exists in the database
    const checkingSQL = 'SELECT email, name from user WHERE email="' + email + '";';

    database.then((connection) => {
        connection.query( checkingSQL, (error, results, fields) => {

            //if there is any error performing the query it will be thrown and will be out of this call.
            if (error) return res.send(JSON.stringify({"status": 400, "error": error}));
            else{
                if (results.length == 0) {

                    const sql = 'INSERT INTO user (email, name, password, address, contact, shovel)' +
                                        'VALUES ("' + email + '", "' + name + '", "' + password + '", "' + address + '", "' + contact + '","'+ shovel +'");';

                            // Adding A User to user table
                            connection.query( sql, (errors, resultset, fields) => {
                                //if there is any error performing the query it will be thrown and will be out of this call.
                                if (errors){ return res.send(JSON.stringify({"status": 400, "error": errors}));}
                                else{
                                    // Create JWT Payload
                                    const payload = {
                                        email: resultset.email
                                    };

                                    // Sign token
                                    jwt.sign(
                                        payload,
                                        keys.secretOrKey,
                                        {
                                            expiresIn: "1 day"
                                        },
                                        (err, token) => {

                                            //if there is any error performing the query it will be thrown and will be out of this call.
                                            if (err) return res.send(JSON.stringify({"status": 400, "error": err}));

                                            //if there is no error than we will get the response with success status.
                                            return res.json({
                                                status: 200,
                                                error: null,
                                                success: true,
                                                token: token,
                                                email: email
                                            });
                                        }
                                    );
                                }
                            });
                } else {
                    // Error handling
                    console.log('This user is already registered!')
                }
            }
        });
    });
});

// login
app.post('/login', (req, res) => {

    if (!req.body.email.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Email-ID input is wrong..!'}));
    if (!req.body.password.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Password input is wrong..!'}));
    console.log(req.body.email);
    const email = req.body.email;
	const password = req.body.password;

    //checking if any User post exists in the database
    const checkingEmail = 'SELECT email, password from user WHERE email="' + email + '";';

    database.then((connection) => {
        connection.query( checkingEmail, (error, results, fields) => {
            console.log(results);
            //if there is any error performing the query it will be thrown and will be out of this call.
            if (error) return res.send(JSON.stringify({"status": 400, "error": error}));
            // if there is no result then we don't have the record with EmailID and password
            if (results < 1) return res.send(JSON.stringify({"status": 404, "error": "No User with same EmailID and Password exists..!!"}));

			const fetchedUser = results[0];
			console.log(fetchedUser.password);
			// Check password
            if (password == fetchedUser.password) {
                // User matched
                // Create JWT Payload
                const payload = {
                    email: fetchedUser.email
                };

                // Sign token
                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: "1 day"
                    },
                    (err, token) => {

                        //if there is any error performing the query it will be thrown and will be out of this call.
                        if (err) return res.send(JSON.stringify({"status": 400, "error": err}));

                        //if there is no error than we will get the response with success status.
                        return res.json({
                            status: 200,
                            error: null,
                            success: true,
                            token: token,
                            email: email
                        });
                    }
                );
            } else {
            return res
                .status(400)
                .json({ error: "Password incorrect" });
            }
		});
	});
});

// logout
app.get('/logout/:token', (req, res) => {

	jwt.verify(req.params.token, keys.secretOrKey, function(err, decoded) {
		console.log(decoded) // decoded token
				console.log(req.params.token) // decoded token

		if(!err){
			const sql = 'update set isonline = 0 where email = "' + decoded.email + '";';
			database.then((connection) => {
				connection.query( sql, (error, results, fields) => {

					//if there is any error performing the query it will be thrown and will be out of this call.
					if (error) return res.send(JSON.stringify({"status": 400, "error": error}));

					return res.json(results);
				});
			});
		} else {
			res.json('Error! ' + err);
		}
	})
});

// get user data
app.get('/user/:email', (req, res) => {

        const sql = 'SELECT * from user WHERE email="' + req.params.email + '";';
        console.log(sql);
        database.then((connection) => {
            connection.query( sql, (error, results, fields) => {

                //if there is any error performing the query it will be thrown and will be out of this call.
                if (error) return res.send(JSON.stringify({"status": 400, "error": error}));

                if (results.length > 0) {
                    const user = results[0]
                    let sql = '';
                    if (user.shovel == 0) {
                        sql = 'SELECT * from user WHERE shovel=1;';
                    } else if (user.shovel == 1) {
                        sql = 'SELECT * from user WHERE shovel=0;';
                    }

                    connection.query( sql, (error, results, fields) => {
                        if (error) return res.send(JSON.stringify({"status": 400, "error": error}));

                        return res.json(results);
                    });
                }

            });
        });

	});


app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
