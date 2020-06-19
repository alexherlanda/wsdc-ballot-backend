require('dotenv').config();
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors({ origin: true }));

const directory = [
	{ name: 'ORADOR 1', email: 'alexisherlanda@gmail.com' },
	{ name: 'ORADOR 2', email: 'alexisherlanda@gmail.com' },
	{ name: 'ORADOR 3', email: 'alexisherlanda@gmail.com' },
];

app.post('/', (req, res) => {
	let successCases = [];
	let errorCases = [];
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
		const correspondingFile = `${person.name}.pdf`;
		const correspondingPath = path.join(
			__dirname,
			'/diplomas',
			correspondingFile
		);

		console.log('correspondingPath >>', correspondingPath);
		const mailOptions = {
			from: process.env.EMAIL,
			to: process.env.EMAIL,
			cc: 'alexisherlanda@gmail.com',
			subject: 'Tu diploma esta listo',
			text: 'Te enviamos una copia de tu correo',
			attachments: [
				{
					fileName: 'Diploma',
					path: correspondingPath,
				},
			],
		};

		transporter.sendMail(mailOptions, (err, data) => {
			let result = false;
			if (err) {
				result = err;
				errorCases.push(data);
			} else {
				result = data;
				successCases.push(data);
			}
			return status;
		});
	});

	console.log('successCases', successCases);

	return res.send({
		message: 'Operation complete',
		data: { successCases: successCases, errorCases: errorCases },
	});
});

module.exports.mailer = functions.https.onRequest(app);
