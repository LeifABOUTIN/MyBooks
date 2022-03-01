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
					<Route path="/register" element={<Register />} />
					<Route path="/search" element={<Search />} />
					<Route path="/book/:id" element={<Book />} />
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
