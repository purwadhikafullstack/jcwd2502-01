const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: 'aryosetyotama27@gmail.com',
            pass: 'larl gwex uwos sfcs'
        },
        tls: {
            rejectUnauthorized: false
        }
    }
)

module.exports = transporter;