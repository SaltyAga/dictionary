const jwt = require('jsonwebtoken');

function generateToken(userInfo) {
	if (!userInfo) {
		return null;
	}

	return jwt.sign(userInfo, process.env.JWT_SECRET, {
		expiresIn: '1h',
	})
}


function verifyToken(userId, token) {
	return jwt.verify(token, process.env.JWT_SECRET, (error, response) => {
		if (error) {
			return {
				verified: false,
				message: 'Invalid token'
			}
		}
		if (response.userEmail !== userId) {
			return {
				verified: false,
				message: 'Invalid user'
			}
		}
		return {
			verified: true,
			message: 'verified'
		}
	})
}

module.exports.generateToken = generateToken;
module.exports.verifyToken = verifyToken;