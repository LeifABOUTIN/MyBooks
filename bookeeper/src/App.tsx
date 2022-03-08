import React, { useState, useEffect } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
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
	console.log(account)
	return (
		<>
			<BrowserRouter>
				<Header login={login} setLogin={setLogin} />
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route
						path="/login"
						element={<Login login setLogin={setLogin} />}
					/>
					<Route
						path="/register"
						element={
							<Register setAccount={setAccount} account={account} />
						}
					/>
					<Route path="/search" element={<Search account={account} />} />
					<Route path="/book/:id" element={<Book />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
