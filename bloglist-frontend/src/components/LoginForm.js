import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
	handleLogin,
	handleUsernameChange,
	handlePasswordChange,
	username,
	password,
}) => {
		return (
			<div>
				<h2>Login to application</h2>
				<form onSubmit={handleLogin}>
					username
					<input 
						value={username} 
						type="text"
						name="Username"
						onChange={({ target }) => handleUsernameChange(target.value)} 
					/>

					password 
					<input 
						value={password} 
						name="Password"
						type="password"
						onChange={({ target }) => handlePasswordChange(target.value)} 
					/>
					<button type="submit">login</button>
				</form>
			</div>
		)
}

LoginForm.propTypes = {
	username: PropTypes.string.isRequired,	
	password: PropTypes.string.isRequired,	
	handleUsernameChange: PropTypes.func.isRequired,
	handlePasswordChange: PropTypes.func.isRequired,
	handleLogin: PropTypes.func.isRequired
}

export default LoginForm
