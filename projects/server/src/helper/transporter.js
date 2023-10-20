const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "nexocomppurwadhika@gmail.com",
		pass: "qjdt samc lvsz whhu",
	},
	tls: {
		rejectUnauthorized: false,
	},
});

module.exports = transporter;
