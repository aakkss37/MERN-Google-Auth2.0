
// ENV CONFIGURATION
import dotenv from 'dotenv';
dotenv.config();
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;



// CONNECTION

import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const mongooseConnection = () => {

	const CONNECTION_URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@cluster0.rvzs3z2.mongodb.net/?retryWrites=true&w=majority`
	const connectionOption = {
		useNewUrlParser: true, useUnifiedTopology: true
	}
	try {
		mongoose.connect(CONNECTION_URL, connectionOption);
		mongoose.connection.on('connected', () => {
			console.log('Database: ---> "connected"');
		});
		mongoose.connection.on('disconnected', () => {
			console.log('Database:---> "disconnected"');
		});
		mongoose.connection.on('error', console.error.bind(console, "connection error"));
	} catch (error) {
		console.log("error while connection data base ---> ", error.message);
	}
}

export default mongooseConnection;


