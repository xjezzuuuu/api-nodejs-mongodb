const mongoose = require('mongoose');

const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_CDN, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});

		console.log('Database start successfully!');
	} catch (err) {
		console.log(err);
		throw new Error('Error on init to startup database');
	}
};

module.exports = {
	dbConnection,
};
