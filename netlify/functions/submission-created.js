// // optionally configure local env vars
// require('dotenv').config()

// // details in https://css-tricks.com/using-netlify-forms-and-netlify-functions-to-build-an-email-sign-up-widget
const process = require('process');

const fetch = require('node-fetch');

const { EMAIL_TOKEN } = process.env;
const handler = async (event) => {
	return {
		statusCode: 200,
		body: JSON.stringify({
			test: 'yo'
		})
	};
};

module.exports = { handler };
