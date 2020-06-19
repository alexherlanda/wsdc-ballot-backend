require('dotenv').config();
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors({ origin: true }));

const myPath = path.join(
	__dirname,
	'/diplomas',
	'ABEL EDUARDO GARCÍA CALDERÓN.pdf'
);

console.log('myPath>> ', myPath);

app.post('/', (req, res) => {
	const isValid = true;

	if (!isValid) {
		return res.status(400).send({ message: 'Algo salio mal' });
	}

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.PASSWORD,
		},
	});

	//TODO: Hide this
	const mailOptions = {
		from: process.env.EMAIL,
		to: process.env.EMAIL,
		cc: 'alexisherlanda@gmail.com',
		subject: 'Tu diploma esta listo',
		text: 'Te enviamos una copia de tu correo',
		attachments: [
			{
				fileName: 'Diploma',
				path: myPath,
			},
		],
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) return res.status(500).send({ message: err.message });
		return res.send({ message: 'Email sent', data: data });
	});
});

module.exports.mailer = functions.https.onRequest(app);
