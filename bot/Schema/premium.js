const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	user_id: {
		type: String,
		required: true
	}
});

module.exports = mongoose.model('premium', schema, 'premiumuser');
