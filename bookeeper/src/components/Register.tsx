import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { FcCancel, FcCheckmark } from "react-icons/fc"
import "./css/Register.css"

interface RegisterProps {
	setAccount: (a: string) => void
	account: string | null
}

const Register: React.FC<RegisterProps> = ({ setAccount, account }) => {
	console.log("ACCOUNT", account)
	const [bookshelf, setBookshelf] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirmation, setPasswordConfirmation] = useState("")

	const navigate = useNavigate()

	useEffect(() => {
		console.log("useffect account", account)
		if (account) navigate("/search")
	}, [account])
	const removeErrorClass = (e: any) => {
		document.querySelector("#error_message_account")?.remove()
		e.currentTarget.classList.contains("input_error") &&
			e.currentTarget.classList.remove("input_error")
	}
	const handleRegister = async (e: React.MouseEvent) => {
		e.preventDefault()

		const payload = {
			account: bookshelf,
			password: password,
		}
		const response = await fetch("http://localhost:8080/register", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(payload),
		})

		const result = await response.json()

		if (response.status === 200) {
			handleSettingAccount(result.account)
		} else {
			const wrongInput = document.querySelector(
				"#bookshelf"
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
	const handleSettingAccount = (a: string) => {
		console.log(a)
		setAccount(a)
		console.log(account)
	}

	return (
		<div className="container_register">
			<div className="register_main">
				<h1>REGISTER</h1>
				<form id="register">
					<div className="input_wrapper">
						<label htmlFor="bookshelf">Name Account: </label>
						<input
							onChange={(e) => {
								removeErrorClass(e)
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
						<button onClick={handleRegister} className="submit">
							REGISTER
						</button>
					) : (
						<button className="submit disabled">REGISTER</button>
					)}
				</form>
			</div>
		</div>
	)
}
export default Register
