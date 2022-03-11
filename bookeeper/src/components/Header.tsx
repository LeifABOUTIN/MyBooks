import React from "react"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import "./css/Header.css"

interface HeaderProps {
	login: boolean
	setLogin: (value: boolean) => void
	setAccount: (value: string | null) => void
}
const Header: React.FC<HeaderProps> = ({ login, setLogin, setAccount }) => {
	const navigate = useNavigate()
	const handleLogout = (): void => {
		window.localStorage.removeItem("searchData")
		window.localStorage.removeItem("myBooksSaved")
		window.localStorage.removeItem("CollectionSize")

		setAccount(null)
		setLogin(false)
		navigate("/")
		fetch("http://localhost:8080/logout")
	}
	const handleActive = (e: React.MouseEvent): void => {
		if (!e.currentTarget.classList.contains("active")) {
			let allLis = document.querySelectorAll("li")!
			allLis.forEach((l) => {
				l.classList.remove("active")
			})
			e.currentTarget.classList.add("active")
		}
	}
	const testIt = async () => {
		let r = await fetch("http://localhost:8080/auth/me", {
			credentials: "include",
			headers: {
				"Content-type": "application/json",
			},
		})
		let d = await r.json()
		console.log(d)
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
							<li onClick={handleActive} className="when-isLoggedIn">
								<Link to="/bookshelf">BOOKSHELF</Link>
							</li>
							<li onClick={handleActive}>
								<Link to="/search">SEARCH</Link>
							</li>
						</>
					)}

					{!login ? (
						<>
							<li onClick={handleActive} className="login_li">
								<Link to="/login">LOGIN</Link>
							</li>
							<li onClick={handleActive}>
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
			<button onClick={testIt}>test</button>
		</header>
	)
}
export default Header
