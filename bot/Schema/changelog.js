const mongoose = require('mongoose');
const reqString = {
	type: String,
	required: true
};

const schema = new mongoose.Schema({
	change_log: reqString,
	time: {
		type: String
	},
	id_ch: {
		type: String
	}
});

module.exports = mongoose.model('clog', schema, 'clog');
