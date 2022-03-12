import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { transitions, positions, Provider as AlertProvider } from "react-alert"

/*
// @ts-ignore */
import AlertTemplate from "react-alert-template-basic"
import Homepage from "./pages/Homepage"
import Register from "./components/Register"
import Login from "./components/Login"
import Header from "./components/Header"
import Search from "./pages/Search"
import Book from "./pages/Book"
import Bookshelf from "./pages/Bookshelf"
import "./App.css"

const App: React.FC = ({}) => {
	const [login, setLogin] = useState<boolean>(false)
	const [account, setAccount] = useState<string | null>(null)
	const options = {
		position: positions.MIDDLE,
		timeout: 3000,
		transition: transitions.SCALE,
	}
	useEffect(() => {
		checkUser()
	}, [])

	const checkUser = async () => {
		let response = await fetch("http://localhost:8080/auth/me", {
			credentials: "include",
		})
		if (response.status === 200) {
			let result = await response.json()
			console.log(result)
			setAccount(result.account)
			setLogin(true)
		} else {
			setAccount(null)
			setLogin(false)
		}
	}
	return (
		<>
			<AlertProvider template={AlertTemplate} {...options}>
				<BrowserRouter>
					<Header
						login={login}
						setLogin={setLogin}
						setAccount={setAccount}
					/>
					<Routes>
						<Route path="/" element={<Homepage />} />
						<Route
							path="/login"
							element={
								<Login
									login
									account={account}
									setLogin={setLogin}
									setAccount={setAccount}
								/>
							}
						/>
						<Route
							path="/bookshelf"
							element={<Bookshelf account={account} login={login} />}
						/>
						<Route
							path="/register"
							element={
								<Register
									setAccount={setAccount}
									setLogin={setLogin}
									account={account}
								/>
							}
						/>
						<Route
							path="/search"
							element={<Search login={login} account={account} />}
						/>
						<Route
							path="/book/:id"
							element={<Book account={account} />}
						/>
					</Routes>
				</BrowserRouter>
			</AlertProvider>
		</>
	)
}

export default App
