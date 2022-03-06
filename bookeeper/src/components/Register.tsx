import React, { useState } from "react"
import { FcCancel, FcCheckmark } from "react-icons/fc"
import "./css/Register.css"

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
	const [bookshelf, setBookshelf] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")

	const handleLogin = (e: React.MouseEvent) => {
		e.preventDefault()
		console.log(bookshelf, password, passwordConfirmation)
		// handleMainLogin(true)
	}
	return (
		<div className="container_register">
			<div className="register_main">
				<h1>REGISTER</h1>
				<form id="register">
					<div className="input_wrapper">
						<label htmlFor="bookshelf">Name Bookshelf: </label>
						<input
							onChange={(e) => {
								setBookshelf(e.target.value)
							}}
							value={bookshelf}
							required
							type="text"
							id="bookshelf"
						/>
						{!bookshelf ? null : bookshelf.length < 4 ? (
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
					{bookshelf &&
					password &&
					passwordConfirmation &&
					password === passwordConfirmation ? (
						<button onClick={handleLogin} className="submit">
							REGISTER
						</button>
					) : (
						<button onClick={handleLogin} className="submit disabled">
							REGISTER
						</button>
					)}
				</form>
			</div>
		</div>
	)
}
export default Register
