const router = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
var database = require('../utils/database');

// login API
router.route('/login').post((req, res) => {
	
    if (!req.body.email.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Email-ID input is wrong..!'}));
    if (!req.body.password.trim()) return res.send(JSON.stringify({"status": 400, "error": 'Password input is wrong..!'}));

    const email = req.body.email;
	const password = req.body.password;

    //checking if any User post exists in the database 
    const checkingSQL = 'SELECT * from user WHERE email="' + email + '";';
    
    database.then((connection) => {
        connection.query( checkingSQL, (error, results, fields) => {
            
            //if there is any error performing the query it will be thrown and will be out of this call.
            if (error) return res.send(JSON.stringify({"status": 400, "error": error}));
    
            // if there is no result then we don't have the record with EmailID and password
            if (results < 1) return res.send(JSON.stringify({"status": 404, "error": "NO User with same EmailID and Password exists..!!"}));
            
            console.log("Am i here??");

			const fetchedUser = results[0];
			
			// Check password
			bcrypt.compare(password, fetchedUser.password).then(isMatch => {
				if (isMatch) {
					// User matched
					// Create JWT Payload
					const payload = {
						email: fetchedUser.email,
						topic: fetchedUser.topic
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
                                token: "Bearer " + token
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
});

// ADD new record
router.route('/add').post((req, res, next) => {
    
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
    
    //checking if any User post exists in the database 
    const checkingSQL = 'SELECT * from user WHERE email="' + email + '";';

    console.log("was here..")
    
    database.then((connection) => {
        connection.query( checkingSQL, (error, results, fields) => {
            
            //if there is any error performing the query it will be thrown and will be out of this call.
            if (error) return res.send(JSON.stringify({"status": 400, "error": error}));
            
            console.log("I was unable to reach here prevously to reach");
            
            //if there is a result then we have the record with same EmailID
            if (results > 0) return res.send(JSON.stringify({"status": 404, "error": "User with same EmailID and Name already exists..!!"}));

            // Hash password before saving in database
            bcrypt.genSalt(10, (err, salt) => {
                if (err) throw err;
                bcrypt.hash(password, salt, (error_, hash) => {
                    if (error_) return res.send(JSON.stringify({"status": 400, "error": errors_}));
					
					const sql = 'INSERT INTO user ' +
                                'VALUES ("' + email + '", "' + name + '", "' + hash + '", "' + address + '", "' + contact + '");';
                    
					// Adding A User to user table
					connection.query( sql, (errors, resultset, fields) => {
                        //if there is any error performing the query it will be thrown and will be out of this call.
                        if (errors) return res.send(JSON.stringify({"status": 400, "error": errors}));
                        
                        console.log("query successful");

                        //if there is no error than we will get the response with success status.
                        return res.send(JSON.stringify({"status": 200, "error": null, "message":"Added new User record in the database", "response": resultset}));                    
                    });
                });
            });
        });
    });
});

// To check for Specific Employee
router.route('/logout/:token').get((req, res) => {
	
	jwt.verify(req.params.token, keys.secretOrKey, function(err, decoded) {
		console.log(decoded) // decoded token
		if(!err){
			const sql = 'update user_status set isonline = 0 where email = "' + decoded.email + '";';
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


module.exports = router;