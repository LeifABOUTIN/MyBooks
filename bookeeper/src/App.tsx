import React, { useState } from "react"
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

import "./App.css"

const App: React.FC = ({}) => {
	const [login, setLogin] = useState<boolean>(false)
	const [account, setAccount] = useState<string | null>(null)
	const options = {
		position: positions.MIDDLE,
		timeout: 20000,
		transition: transitions.SCALE,
	}

	return (
		<>
			<AlertProvider template={AlertTemplate} {...options}>
				<BrowserRouter>
					<Header login={login} setLogin={setLogin} />
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
						<Route path="/book/:id" element={<Book />} />
					</Routes>
				</BrowserRouter>
			</AlertProvider>
		</>
	)
}

export default App
