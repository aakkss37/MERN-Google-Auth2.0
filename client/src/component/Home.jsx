import React from 'react'
const Home = (props) => {

  return (
	  <div>
		  <img src={props.user.img} alt='proPic' style={{ borderRadius: "50%" }} />
		  <h2>Welcome {props.user.name}</h2>
		  <span>{props.user.email}</span>
		  <br />
		  <br />
		  <button onClick={() => { props.setUser() }}>Logout</button>
	  </div>
  )
}

export default Home