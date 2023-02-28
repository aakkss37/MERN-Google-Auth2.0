import React, { useEffect, useState } from 'react'
import './App.css';
import Home from './component/Home';
import Login from './component/Login';
import { BrowserRouter, Routes, Route, Navigate, Outlet, } from 'react-router-dom'
import axios from 'axios';

const PrivateRoute = (props) => (
	props.isUser
		?
		<>
			<Outlet />
		</>
		:
		<Navigate replace to='/' />
)



const validateAccessTokan = async (aaccessToken)=>{
	const responce = await axios.post("http://localhost:8000/validate-access-tokan", {
		access_token: aaccessToken,
	});

	console.log(responce);
}



function App () {

	useEffect(() => {
		const aaccessToken = sessionStorage.getItem("accessToken");
		if(aaccessToken){
			validateAccessTokan(aaccessToken)
		}
	}, );

	const [user, setUser] = useState();
	// console.log(user)
	return (
		<BrowserRouter>
			<div className="App">
				<header className="App-header">
					<Routes>
						<Route path='/' element={ <Login setUser={setUser} />  }/>
						<Route path='/home' element={<PrivateRoute isUser={user} />}>
							<Route path='/home' element={<Home user={user} setUser={setUser} />} />
						</Route>
					</Routes>

				</header>
			</div>
		</BrowserRouter>
	);
}

export default App;
