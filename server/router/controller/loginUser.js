import axios from 'axios';
import User from '../../model/userShema.js';
import jwt from 'jsonwebtoken';
import Token from '../../db/token.js';



const createToken = async(user)=> {
	const accessTokan = jwt.sign(user.toJSON(), process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '15m' });
	const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_TOKEN_SECRET_KEY);
	const newToken = await Token.create({ token: refreshToken });
	newToken.save();

	return {accessTokan: accessTokan, refreshToken: refreshToken}
}





export const loginUser = async(req, resp)=> {
	// console.log("body ===>>> ",req.body);
	const access_token = req.body.access_token

	try {
		const responce = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`,{
			headers: {
				"Authorization": `Bearer ${access_token}`,
				"Accept": 'application/json'
			}
		})
		// console.log("incomming data==> ",responce.data)

		const user = await User.findOne({ googleID: responce.data.id });
		if (!user) {
			const userData = {
				googleID: responce.data.id,
				name: responce.data.name,
				email: responce.data.email,
				picture: responce.data.picture
			}
			console.log("user data===> ", userData)
			const newUser = await User.create(userData);
			await newUser.save();

			// console.log("newUser =====>>>>>>>>> ", newUser)
			const {accessTokan, refreshToken} = await createToken(newUser)

			return resp.status(200).json({
				jwtAccessToken: accessTokan,
				jwtRefreshToken: refreshToken,
				name: responce.name,
				email: responce.email,
				picture: responce.picture
			})
		} else {
			const user = await User.findOne({ googleID: responce.data.id });
			const tokens = await createToken(user)
			console.log("user =====>>>>>>>>> ", user)
		}

	} catch (error) {
		console.log(error)
		return resp.status(403).json({ msg: "invalid token" });
	}

}