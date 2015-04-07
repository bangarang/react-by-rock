// config/database.js
module.exports = {
	 'url' : process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/victor_victoria',
	 'test' : 'mongodb://localhost/victor_victoria_test'
};