import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


// APP CONFIGURATION 
const app = express();
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());





// // DATABASE CONNECTION
// import mongooseConnection from './database/db.js';
// mongooseConnection();




// // ROUTES
// import router from './router/route.js';
// app.use('/', router)



// APP PORT LISTEN
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
	console.log(`server is running on port: ${PORT}`);
})
