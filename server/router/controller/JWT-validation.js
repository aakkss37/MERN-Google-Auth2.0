import Jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();

export const ValidateJWT = (req, resp, next) => {
	const authTokan = req.body.aaccessToken
	// console.log(authTokan)
	const token = authTokan && authTokan.split(' ')[1];
	if (token == null) {
		return resp.status(401).json({ msg: "Token is missing" });
	}
	Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY, (error, user) => {
		if (error) {
			return resp.status(403).json({ msg: "invalid token" });
		}
		// console.log("request ==> ", req);
		console.log("user value: ===> ", user)
		next();
	})
}
