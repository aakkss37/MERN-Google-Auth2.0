import React, { useState } from 'react'
import './App.css';
import { LoginSocialGoogle } from 'reactjs-social-login';
import { GoogleLoginButton } from 'react-social-login-buttons';
const client_id = process.env.REACT_APP_CLIENT_ID



function App () {
	const [user, setUser] = useState();
	const handleLoginResponce = (data) => {
		setUser({
			name: data.name,
			email: data.email,
			img: data.picture
		})
	}

	return (
		<div className="App">
			<header className="App-header">
				{
					!user ?
						<LoginSocialGoogle
							client_id={client_id}
							scope="openid profile email"
							discoveryDocs="claims_supported"
							access_type="offline"
							onResolve={ ({ provider, data }) => {
								handleLoginResponce(data)
								console.log(data)
							}}
							onReject={err => {
								console.log(err);
							}}
							hosted_domain="kahedu.edu.in"
						>
							<GoogleLoginButton />
						</LoginSocialGoogle>
						:
						<div>
							<img src={user.img} alt='proPic'  style={{borderRadius: "50%"}}/>
							<h2>Welcome {user.name}</h2>
							<span>{user.email}</span>
							<br />
							<br />
							<button onClick={() => { setUser() }}>Logout</button>
						</div>
				}

			</header>
		</div>
	);
}

export default App;
