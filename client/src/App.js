import React from 'react'
import './App.css';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';

function App () {
	const handleLoginResponce = (data) => {
		console.log(data)
	}


	return (
		<div className="App">
			<header className="App-header">
				<LoginSocialGoogle
					client_id={""}
					scope="openid profile email"
					discoveryDocs="claims_supported"
					access_type="offline"
					onResolve={({ provider, data }) => {
						handleLoginResponce(data)
					}}
					onReject={err => {
						console.log(err);
					}}
					hosted_domain="kahedu.edu.in"
				>
					<GoogleLoginButton />
				</LoginSocialGoogle>
			</header>
		</div>
	);
}

export default App;
