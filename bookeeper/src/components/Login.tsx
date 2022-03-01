import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { FcCancel, FcCheckmark } from "react-icons/fc"
import "./css/Login.css"

interface LoginProps {
	setLogin: (value: boolean) => void
	login: boolean
}

const Login: React.FC<LoginProps> = ({ setLogin }) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	const handleLogin = (e: React.MouseEvent): void => {
		e.preventDefault()
		console.log(username, password)
		setLogin(true)
		navigate("/")
	}
	return (
		<div className="login_main">
			<h1>LOGIN</h1>
			<form id="login">
				<div className="input_wrapper">
					<label htmlFor="username">Username: </label>
					<input
						onChange={(e) => {
							setUsername(e.target.value)
						}}
						value={username}
						required
						type="text"
						id="username"
					/>
					{!username ? null : username.length < 4 ? (
						<FcCancel className="icon_input" />
					) : (
						<FcCheckmark className="icon_input" />
					)}
				</div>
				<div className="input_wrapper">
					<label htmlFor="password">Password: </label>

					<input
						onChange={(e) => setPassword(e.target.value)}
						value={password}
						required
						type="password"
						id="password"
					/>
					{!password ? null : password.length < 6 ? (
						<FcCancel className="icon_input" />
					) : (
						<FcCheckmark className="icon_input" />
					)}
				</div>

				{username && password ? (
					<button onClick={handleLogin} className="submit">
						LOGIN
					</button>
				) : (
					<button onClick={handleLogin} className="submit disabled">
						LOGIN
					</button>
				)}
			</form>
		</div>
	)
}
export default Login
