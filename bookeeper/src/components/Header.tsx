import React from "react"
import { Link } from "react-router-dom"
import "./css/Header.css"

interface HeaderProps {
	login: boolean
	setLogin: (value: boolean) => void
}
const Header: React.FC<HeaderProps> = ({ login, setLogin }) => {
	const handleLogout = (): void => {
		setLogin(false)
		console.log(login)
	}
	return (
		<header>
			<nav>
				<ul>
					<li className="home_a">
						<Link to="/">
							<span>Book</span>eeper
						</Link>
					</li>
					{login && (
						<>
							<li className="when-isLoggedIn">
								<Link to="/bookshelf">BOOKSHELF</Link>
							</li>
							<li>
								<Link to="/search">SEARCH</Link>
							</li>
						</>
					)}

					{!login ? (
						<>
							<li className="login_li">
								<Link to="/login">LOGIN</Link>
							</li>
							<li>
								<Link to="/register">REGISTER</Link>
							</li>
						</>
					) : (
						<button
							onClick={handleLogout}
							className="logout_btn"
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
