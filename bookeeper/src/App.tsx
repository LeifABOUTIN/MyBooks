import React, { useState } from "react"
import Login from "./components/Login"

import "./App.css"

function App() {
	const [login, setLogin] = useState(false)
	const handleMainLogin = (value: boolean): void => {
		setLogin(value)
	}
	return (
		<div className="App">
			<h1 className="main-title">Bookeeper.</h1>
			{!login && <Login handleMainLogin={handleMainLogin} />}
		</div>
	)
}

export default App
