require('dotenv').config();
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors({ origin: true }));
const randomName = 'ABEL EDUARDO GARCÍA CALDERÓN';
const correspondingFile = `${randomName}.pdf`;

const myPath = path.join(__dirname, '/diplomas', correspondingFile);

const directory = [
	{ name: 'ORADOR 1', email: 'alexisherlanda@gmail.com' },
	{ name: 'ORADOR 2', email: 'alexisherlanda@gmail.com' },
	{ name: 'ORADOR 3', email: 'alexisherlanda@gmail.com' },
];

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

	directory.forEach((person) => {
		console.log('person >>', person.name);
		const mailOptions = {
			from: process.env.EMAIL,
			to: process.env.EMAIL,
			cc: 'alexisherlanda@gmail.com',
			subject: 'Tu diploma esta listo',
			text: 'Te enviamos una copia de tu correo',
			attachments: [
				{
					filename: 'Diploma',
					path: myPath,
				},
			],
		};

		transporter.sendMail(mailOptions, (err, data) => {
			let result = false;
			if (err) {
				result = err;
				console.log('Error', err);
			} else {
				result = data;
				console.log('Correct', data);
			}

			return status;
		});
	});

	return res.send({ message: 'Operation complete', data: 'data' });
});

module.exports.mailer = functions.https.onRequest(app);
