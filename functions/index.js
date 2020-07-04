require('dotenv').config();
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');
const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors({ origin: true }));

const directory = [
	{
		id: '45',
		name: 'ADRIANA JAZMIN ROJAS VELEZ ',
		email: 'ajazminrv@gmail.com',
	},
];

app.post('/', (req, res) => {
	let successCases = [];

	let errorCases = [];
	const isValid = true;
	let processed = 0;

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
		const correspondingFile = `${person.id}.pdf`;
		const correspondingPath = path.join(
			__dirname,
			'/diplomas',
			correspondingFile
		);

		const mailOptions = {
			cc: 'world.schools.smooth.ballot@gmail.com',
			from: process.env.EMAIL,
			to: person.email,
			subject: 'Tu justificante esta listo',
			text: `Gracias por participar. Se anexa a este correo tu justificante del TMVD INE-AMD. Envío automático no responder a este correo `,
			attachments: [
				{
					filename: 'Diploma.pdf',
					path: correspondingPath,
				},
			],
		};

		transporter.sendMail(mailOptions, (err, data) => {
			processed++;
			console.log('processed', processed);
			let result = false;
			if (err) {
				result = err;
				console.log('ERROR!' + person.id, person.name);
				console.log('err >>', err);
				errorCases.push({ email: person.email, name: person.name });
			} else {
				result = data;
				console.log('SUCCESS!' + person.id, person.name);
				successCases.push({ email: person.email, name: person.name });
			}
			return result;
		});
	});

	console.log('successCases', successCases);

	return res.send({
		message: 'Operation complete',
		data: { successCases: successCases, errorCases: errorCases },
	});
});

module.exports.mailer = functions.https.onRequest(app);
