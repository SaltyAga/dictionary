const AWS = require('aws-sdk');
AWS.config.update({
	region: 'eu-north-1'
})
const util = require('../utils/util');
const bcrypt = require('bcryptjs');

const dynamodb = new AWS.DynamoDB.DocumentClient();
const userTable = 'User';

async function register(userInfo) {
	const userId = userInfo.userId;
	const name = userInfo.name;
	const userEmail = userInfo.userEmail;
	const password = userInfo.password;
	if (!userId || !name || !userEmail || !password) {
		return util.buildResponse(401, {
			message: 'All fields are required'
		})
	}

	const dynamoUser = await getUser(userEmail);
	if (dynamoUser && dynamoUser.userEmail) {
		return util.buildResponse(401, {
			message: 'User already exists in our database. Please choose a different user email'
		})
	}

	const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
	const user = {
		userId: userEmail.toLowerCase().trim(),
		userEmail: userEmail.toLowerCase().trim(),
		name: name.trim(),
		password: encryptedPassword
	}

	const saveUserResponse = await saveUser(user);
	if (!saveUserResponse) {
		return util.buildResponse(503, {
			message: 'Server Error. Please try again later.'
		})
	}

	return util.buildResponse(200, { name: name });
}

async function getUser(userId) {
	const params = {
		TableName: userTable,
		Key: {
			userId: userId.toLowerCase().trim()
		}
	}

	return await dynamodb.get(params).promise().then(response => {
		return response.Item;
	}, error => {
		console.error('There is a get user error: ', error);
	})
}

async function saveUser(user) {
	const params = {
		TableName: userTable,
		Item: user
	}
	return await dynamodb.put(params).promise().then(() => {
		return true;
	}, error => {
		console.error('There is a save user error: ', error)
	});
}

module.exports.register = register;