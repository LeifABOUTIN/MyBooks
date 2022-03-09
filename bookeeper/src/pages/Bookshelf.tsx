import React, { useState, useEffect } from "react"
import MyList from "../components/MyList"
import { useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import "./css/Bookshelf.css"

interface BookshelfProps {
	account: string | null
	login: boolean
}

const Bookshelf: React.FC<BookshelfProps> = ({ account, login }) => {
	const alert = useAlert()
	const url = "https://www.googleapis.com/books/v1/volumes/"
	const navigate = useNavigate()
	const [data, setData] = useState<any[] | null>(null)
	const grabBookFromId = async (id: string) => {
		return await (await fetch(url + id)).json()
	}
	const grabMyBooks = async () => {
		const payload = { account }
		let response = await fetch("http://localhost:8080/my-books", {
			method: "POST",
			headers: {
				"Accept": "application/json",
			},
			body: JSON.stringify(payload),
		})

		if (response.status === 200) {
			const myBooks = await response.json()
			const myBooksData = []
			for (let bookId of myBooks.books) {
				let d = await grabBookFromId(bookId)
				myBooksData.push(d)
			}
			if (myBooksData.length > 0) setData(myBooksData)
		} else {
			alert.show(
				<div
					style={{
						color: "red",
						padding: "1rem",
						fontFamily: "Roboto",
					}}
				>
					There was an error fetching data.
				</div>
			)
		}
	}
	useEffect(() => {
		if (account) {
			grabMyBooks()
		}
	}, [])
	useEffect(() => {
		if (!login) {
			alert.show(
				<div
					style={{
						color: "red",
						padding: "1rem",
						fontFamily: "Roboto",
					}}
				>
					Please Login First.
				</div>
			)

			navigate("/login")
		}
	}, [login])
	return (
		<>
			<div className="container_bookshelf">
				<h1 className="bookshelf_title">
					<span>Hi</span> <span></span>
					<span>from</span> <span>your</span> <span>bookshelf</span>,
					<span className="account_span">{account}</span>!
				</h1>
				<MyList data={data} account={account} />
			</div>
		</>
	)
}
export default Bookshelf
