require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config.db');

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT || 3000;
		this.routesPath = '/api';

		// Connect to database
		this.connectDB();

		// Middlewares
		this.middlewares();

		// Routes
		this.routes();
	}

	async connectDB() {
		await dbConnection();
	}

	middlewares() {
		// CORS
		this.app.use(cors());

		// parse json
		this.app.use(express.json());
		// this.app.use(express.urlencoded({ urlencoded: true }));

		// Folder public static
		this.app.use(express.static(__dirname + '/../public'));
	}

	routes() {
		this.app.use(this.routesPath, require('../routes/index'));
	}

	// Init Server
	listen() {
		this.app.set('port', this.port);

		this.app.listen(this.app.get('port'), () => {
			console.log('Server listen on port', this.app.get('port'));
		});
	}
}

module.exports = Server;
