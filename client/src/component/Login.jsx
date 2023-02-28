import React from 'react'
import { LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const client_id = process.env.REACT_APP_CLIENT_ID


const Login = (props) => {
	const navigate = useNavigate();
	
	const handleLoginResponce = async (data) => {
		// console.log("tokenID==>>>>",data.access_token)
		props.setUser({
			name: data.name,
			email: data.email,
			img: data.picture
		})
		navigate('/home')
		try {
			const resp = await axios.post("http://localhost:8000/", {
				access_token: data.access_token,
			})
			console.log(resp.data)
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