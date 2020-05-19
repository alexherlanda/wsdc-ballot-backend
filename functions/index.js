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
		html: `
			<style>
				.demo {
					border:1px solid #C0C0C0;
					border-collapse:collapse;
					padding:5px;
				}
				.demo th {
					border:1px solid #C0C0C0;
					padding:5px;
					background:#F0F0F0;
				}
				.demo td {
					border:1px solid #C0C0C0;
					padding:5px;
				}
			</style>
			<div>
				<p> Juez: Alexis Herlanda </p>
				<p> Afiliación: UNAM </p>
				<p> Ganador: Oposición </p>
				<br /><br /><br />
				<table class="demo">
				<caption>Proposición</caption>
				<tr>
					<th>Orador</th>
					<th>Puntaje</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>&nbsp;Total</td>
					<td>&nbsp;240</td>
				</tr>
				<tr>
					<td>&nbsp;1ero Prop</td>
					<td>&nbsp;60</td>
				</tr>
				<tr>
					<td>&nbsp;2do Prop</td>
					<td>&nbsp;60</td>
				</tr>
				<tr>
					<td>&nbsp;3ero Prop</td>
					<td>&nbsp;60</td>
				</tr>
				<tr>
					<td>&nbsp;Replica Prop</td>
					<td>&nbsp;60</td>
				</tr>
				<tbody>
				</table>
			    <br/> <br /> <br />
				<table class="demo">
				<caption>Oposición</caption>
				<tr>
					<th>Orador</th>
					<th>Puntaje</th>
				</tr>
				</thead>
				<tbody>
				<tr>
					<td>&nbsp;Total</td>
					<td>&nbsp;240</td>
				</tr>
				<tr>
					<td>&nbsp;1ero Oppo</td>
					<td>&nbsp;60</td>
				</tr>
				<tr>
					<td>&nbsp;2do Oppo</td>
					<td>&nbsp;60</td>
				</tr>
				<tr>
					<td>&nbsp;3ero Oppo</td>
					<td>&nbsp;60</td>
				</tr>
				<tr>
					<td>&nbsp;Replica Oppo</td>
					<td>&nbsp;60</td>
				</tr>
				<tbody>
				</table>
			</div>`,
	};

	transporter.sendMail(mailOptions, (err, data) => {
		if (err) return res.status(500).send({ message: err.message });
		return res.send({ message: 'Email sent', data: data });
	});
});

module.exports.mailer = functions.https.onRequest(app);
