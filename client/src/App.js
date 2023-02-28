import React, { useState } from 'react'
import './App.css';
import Home from './component/Home';
import Login from './component/Login';
import { BrowserRouter, Routes, Route, Navigate, Outlet, } from 'react-router-dom'


const PrivateRoute = (props) => (
	props.isUser
		?
		<>
			<Outlet />
		</>
		:
		<Navigate replace to='/' />
)



function App () {

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
