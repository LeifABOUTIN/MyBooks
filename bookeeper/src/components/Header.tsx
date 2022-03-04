import React from "react"
import { Link } from "react-router-dom"
import styles from "./css/Header.module.css"

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
			<nav className={styles.nav}>
				<ul className={styles.ul}>
					<li>
						<Link className={styles.a} to="/">
							HOME
						</Link>
					</li>
					{login && (
						<>
							<li>
								<Link className={styles.a} to="/bookshelf">
									BOOKSHELF
								</Link>
							</li>
							<li>
								<Link className={styles.a} to="/search">
									SEARCH
								</Link>
							</li>
						</>
					)}

					{!login ? (
						<>
							<li className={styles.login_li}>
								<Link className={styles.a} to="/login">
									LOGIN
								</Link>
							</li>
							<li>
								<Link className={styles.a} to="/register">
									REGISTER
								</Link>
							</li>
						</>
					) : (
						<button
							onClick={handleLogout}
							className={styles.logout_btn}
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
