const mongoose = require('mongoose');
const { mongodb } = require('../database/config.json');

module.exports = async () => {
	await mongoose.connect(mongodb, {
		keepAlive: true
	});

	return mongoose;
};
