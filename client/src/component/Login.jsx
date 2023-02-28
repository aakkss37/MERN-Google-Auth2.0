import React, { useEffect } from 'react'
import { LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const client_id = process.env.REACT_APP_CLIENT_ID


const validateAccessTokan = async (aaccessToken) => {
	try {
		const responce = await axios.post("http://localhost:8000/validate-access-tokan", {
			aaccessToken: aaccessToken
		});

		// console.log(responce.data);
		return responce.data
	} catch (error) {
		console.log(error);
	}
}



const Login = (props) => {
	const navigate = useNavigate();



	useEffect(() => {
		const aaccessToken = sessionStorage.getItem("accessToken");
		console.log("aaccessToken from session ==>>>>>>>>", aaccessToken)
		const validateToken = async () => {
			if (aaccessToken) {
				const userData = await validateAccessTokan(aaccessToken)
				// console.log(userData)
				props.setUser(userData);
				navigate('/home')
			}
		}
		validateToken();
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);




	
	const handleLoginResponce = async (data) => {
		// console.log("tokenID==>>>>",data.access_token)
		
		try {
			const responce = await axios.post("http://localhost:8000/", {
				access_token: data.access_token,
			})
			// console.log(resp.data)
			sessionStorage.setItem('accessToken', `Bearer ${responce.data.jwtAccessToken}`) //SESSION STORAGE
			sessionStorage.setItem('refreshToken', `Bearer ${responce.data.jwtRefreshToken}`)
			props.setUser({
				name: responce.data.name,
				email: responce.data.email,
				img: responce.data.picture
			})

			navigate('/home')
		} catch (error) {
			console.log(error)
		}
	}


  return (
	  <LoginSocialGoogle
		  client_id={client_id}
		  scope="openid profile email"
		  discoveryDocs="claims_supported"
		  access_type="offline"
		  onResolve={({ provider, data }) => {
			  handleLoginResponce(data)
			  console.log(data)
		  }}
		  onReject={err => {
			  console.log(err);
		  }}
		  hosted_domain="kahedu.edu.in"
		  fetch_basic_profile={true}
	  >
		  <GoogleLoginButton />
	  </LoginSocialGoogle>
  )
}

export default Login