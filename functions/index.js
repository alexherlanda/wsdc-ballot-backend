require('dotenv').config();
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({ origin: true }));

app.post('/', (req, res) => {
	const { body } = req;
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

	const mailOptions = {
		from: process.env.EMAIL,
		to: 'alexisherlanda@gmail.com',
		subject: 'Test',
		text: 'Hola estos son los resultados de tu debate',
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) return res.status(500).send({ message: err.message });
		return res.send({ message: 'Email sent', data: data });
	});
});

module.exports.mailer = functions.https.onRequest(app);
