import React from "react"
import { Link } from "react-router-dom"
import "./css/Header.css"

interface HeaderProps {
	login: boolean
	setLogin: (value: boolean) => void
}
const Header: React.FC<HeaderProps> = ({ login, setLogin }) => {
	const handleLogout = (): void => {
		console.log("handleLogout")
		setLogin(false)
		console.log(login)
	}
	return (
		<header>
			<nav>
				<ul>
					<li>
						<Link to="/">HOME</Link>
					</li>
					{login && (
						<>
							<li>
								<Link to="/bookshelf">BOOKSHELF</Link>
							</li>
							<li>
								<Link to="/search">SEARCH</Link>
							</li>
						</>
					)}

					{!login ? (
						<>
							<li className="login-li">
								<Link to="/login">LOGIN</Link>
							</li>
							<li>
								<Link to="/register">REGISTER</Link>
							</li>
						</>
					) : (
						<button
							onClick={handleLogout}
							className="logout-btn"
							type="button"
						>
							LOGOUT
						</button>
					)}
				</ul>
			</nav>
		</header>
	)
}
export default Header
