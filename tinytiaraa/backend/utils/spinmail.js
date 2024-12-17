const nodeMailer = require('nodemailer');
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const { Button, Html } = require("@react-email/components");

const { render } = require("@react-email/components")
// Ensure Babel is used to transpile JSX
// require('@babel/register')({
//     presets: ['@babel/preset-env', '@babel/preset-react']
// });


// const Welcome = require("@react-email/components").default;
// const Welcome = require("../../client/src/emails/Welcome");


const spinmail = async (options) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.SMPT_HOST,
        port: process.env.SMPT_PORT,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });
    // const url = 'https://example.com'; // Replace with your actual URL
    // const emailHtml = render(React.createElement(Welcome, { url }));

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.subject,
        html: options.html,
    };


    await transporter.sendMail(mailOptions)

}


module.exports = spinmail;