import React, { useState, useEffect } from "react"
import MyList from "../components/MyList"
import Loader from "../components/Loader"
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
	// const [collectionSize, setCollectionSize] = useState<number>(0)
	const grabBookFromId = async (id: string) => {
		return await (await fetch(url + id)).json()
	}
	const grabMyBooks = async () => {
		const payload = { account }
		let response = await fetch("http://localhost:8080/auth/my-books", {
			credentials: "include",
			method: "POST",
			headers: {
				"Accept": "application/json",
			},
			body: JSON.stringify(payload),
		})
		const myBooks = await response.json()

		if (response.status === 200 && myBooks.book.length > 0) {
			const myBooksData = []
			// setCollectionSize(myBooksData.length)
			window.localStorage.setItem(
				"CollectionSize",
				myBooks.books.length.toString()
			)
			for (let bookId of myBooks.books) {
				let d = await grabBookFromId(bookId)
				myBooksData.push(d)
			}
			if (myBooksData.length > 0) {
				let stringedData: string = JSON.stringify(myBooksData)
				window.localStorage.setItem("myBooksSaved", stringedData)
				setData(myBooksData)
			}
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
	const checkingSize = async (o: object[]) => {
		const payload = { account }
		let response = await fetch("http://localhost:8080/auth/my-books", {
			credentials: "include",
			method: "POST",
			headers: {
				"Accept": "application/json",
			},
			body: JSON.stringify(payload),
		})

		if (response.status === 200) {
			const myBooks = await response.json()
			const collectionSize = window.localStorage.getItem("CollectionSize")

			if (
				collectionSize &&
				myBooks.books &&
				myBooks.books.length > parseInt(collectionSize)
			) {
				const diff = myBooks.books.length % parseInt(collectionSize)
				const diffArray = myBooks.books.slice(-diff)

				const missingData = []
				for (let b of diffArray) {
					missingData.push(await grabBookFromId(b))
				}
				const upadatedCollection = [...o, ...missingData]
				setData(upadatedCollection)
				window.localStorage.setItem(
					"myBooksSaved",
					JSON.stringify(upadatedCollection)
				)
			} else {
				setData(o)
			}
		}
	}
	useEffect(() => {
		let d = window.localStorage.getItem("myBooksSaved")

		if (!data && d) {
			const object: object[] = JSON.parse(d)
			checkingSize(object)
		} else if (account) {
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
			{!data && (
				<div className="bookshelf_loader_container">
					<Loader />
				</div>
			)}
			<div className="container_bookshelf">
				<h1 className="bookshelf_title">
					<span>Hi</span> <span></span>
					<span>from</span> <span>your</span> <span>bookshelf</span>,
					<span className="account_span">{account}</span>!
				</h1>
				{data && <MyList data={data} account={account} />}
				{/* <Loader /> */}
			</div>
		</>
	)
}
export default Bookshelf
