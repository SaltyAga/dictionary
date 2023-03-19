const AWS = require('aws-sdk');
AWS.config.update({
	region: 'eu-north-1'
})
const util = require('../utils/util');
const bcrypt = require('bcryptjs');
const auth = require('../utils/auth');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'User';

async function login(user) {
	const userEmail = user.userEmail;
	const password = user.password;
	if (!user || !userEmail || !password) {
		return util.buildCORSResponse(401, {
			message: 'User email and password are required.'
		})
	}

	const dynamoUser = await getUser(userEmail.toLowerCase().trim());
	if (!dynamoUser || !dynamoUser.userId) {
		return util.buildResponse(403, {
			message: "User does not exist"
		})
	}

	if (!bcrypt.compareSync(password, dynamoUser.password)) {
		return util.buildResponse(403, {
			message: 'Password is incorrect'
		})
	}

	const userInfo = {
		name: dynamoUser.name,
		userEmail: dynamoUser.userEmail,
		userId: dynamoUser.userEmail
	}
	const token = auth.generateToken(userInfo);
	const response = {
		user: userInfo,
		token: token
	}
	return util.buildResponse(200, response);
}

async function getUser(userId) {
	const params = {
		TableName: userTable,
		Key: {
			userId: userId
		}
	}
	return await dynamodb.get(params).promise().then(response => {
		return response.Item;
	}, error => {
		console.error('There is a get user error: ', error);
	})
}

module.exports.login = login;