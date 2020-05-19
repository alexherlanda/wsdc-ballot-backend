const functions = require('firebase-functions');
const express = require('express');
const nodemailer = require('nodemailer');
require('dotenv').config();
const app = express();
app.get('/home', (re, res) => {
	//Step 1
	let transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.PASSWORD,
			pass: process.env.EMAIL,
		},
	});

	// Setep 2
	let mailOptions = {
		from: 'wudcballot@gmail.com',
		to: 'alexisherlada@gmail.com',
		subject: 'México Debate WSDC Result',
		text: 'Hola desde wsdc backend',
	};

	//Step 3
	transporter.sendMail(mailOptions, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log('Success');
		}
	});
	res.send('hello from express app backend');
});

exports.app = functions.https.onRequest(app);
