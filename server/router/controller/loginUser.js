import axios from 'axios';

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
		console.log("incomming data==> ",responce.data)
	} catch (error) {
		console.log(error)
	}

}