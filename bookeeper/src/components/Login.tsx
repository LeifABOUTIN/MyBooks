import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FcCancel, FcCheckmark } from "react-icons/fc"
import "./css/Login.css"

interface LoginProps {
	setLogin: (value: boolean) => void
	setAccount: (value: string) => void
	login: boolean
	account: string | null
}

const Login: React.FC<LoginProps> = ({ setLogin, setAccount, account }) => {
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate()

	useEffect(() => {
		if (account) navigate("/search")
	}, [account])

	const handleLogin = async (e: React.MouseEvent) => {
		e.preventDefault()
		const payload = {
			account: username,
			password: password,
		}
		const response = await fetch("http://localhost:8080/login", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(payload),
		})

		const result = await response.json()
		console.log("Response :", response)
		console.log("Result :", result.message)
		if (response.status === 200) {
			setLogin(true)
			setAccount(result.account)
		} else if (result.message.includes("password is incorrect.")) {
			console.log("wrong password")
			const wrongInput = document.querySelector(
				"#password"
			) as HTMLInputElement
			const wrongInputDiv = document.querySelectorAll(
				".input_wrapper"
			)[1] as HTMLElement
			wrongInput.classList.add("input_error")
			let pre = document.createElement("pre") as HTMLElement
			pre.style.color = "red"
			pre.innerText = result.message
			pre.id = "error_message_password"
			wrongInputDiv.after(pre)
		} else {
			const wrongInput = document.querySelector(
				"#username"
			) as HTMLInputElement
			const wrongInputDiv = document.querySelectorAll(
				".input_wrapper"
			)[0] as HTMLElement
			wrongInput.classList.add("input_error")
			let pre = document.createElement("pre") as HTMLElement
			pre.style.color = "red"
			pre.innerText = result.message
			pre.id = "error_message_account"
			wrongInputDiv.after(pre)
			console.log(result)
		}
	}
	const removeErrorClass = (e: any) => {
		if (e.currentTarget.id === "username")
			document.querySelector("#error_message_account")?.remove()
		if (e.currentTarget.id === "password")
			document.querySelector("#error_message_password")?.remove()

		e.currentTarget.classList.contains("input_error") &&
			e.currentTarget.classList.remove("input_error")
	}
	return (
		<div className="container_login">
			<div className="login_main">
				<h1>LOGIN</h1>
				<form id="login">
					<div className="input_wrapper">
						<label htmlFor="username">Username: </label>
						<input
							onChange={(e) => {
								removeErrorClass(e)
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
							onChange={(e) => {
								removeErrorClass(e)
								setPassword(e.target.value)
							}}
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
						<button className="submit disabled">LOGIN</button>
					)}
				</form>
				<a className="link_register" onClick={() => navigate("/register")}>
					Create an account.
				</a>
			</div>
		</div>
	)
}
export default Login
