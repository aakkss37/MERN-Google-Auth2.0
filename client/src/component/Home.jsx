import React from 'react'
import { useNavigate } from 'react-router-dom'
const Home = (props) => {
	const navigate = useNavigate()

	const logOutHnadler = () => {
		sessionStorage.clear()
		props.setUser()
		navigate('/')
	}

	return (
		<div>
			<img src={props.user.img} alt='proPic' style={{ borderRadius: "50%" }} />
			<h2>Welcome {props.user.name}</h2>
			<span>{props.user.email}</span>
			<br />
			<br />
			<button onClick={logOutHnadler}>Logout</button>
		</div>
	)
}

export default Home