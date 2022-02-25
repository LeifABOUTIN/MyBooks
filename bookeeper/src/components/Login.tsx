import React, { useState } from "react"
import { FcCancel, FcCheckmark } from "react-icons/fc"
import "./css/Login.css"
type LoginProps = {
	handleMainLogin: (value: boolean) => void
}
export default function Login({ handleMainLogin }: LoginProps) {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")

	const handleLogin = (e: React.MouseEvent) => {
		e.preventDefault()
		console.log(username, password, passwordConfirmation)
		handleMainLogin(true)
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
				<div className="input_wrapper">
					<label htmlFor="pw_confirm">Confirm Password: </label>
					<input
						onChange={(e) => setPasswordConfirmation(e.target.value)}
						value={passwordConfirmation}
						required
						type="password"
						id="pw_confirm"
					/>

					{!passwordConfirmation ? null : password !==
					  passwordConfirmation ? (
						<FcCancel className="icon_input" />
					) : (
						<FcCheckmark className="icon_input" />
					)}
				</div>
				{username &&
				password &&
				passwordConfirmation &&
				password === passwordConfirmation ? (
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
