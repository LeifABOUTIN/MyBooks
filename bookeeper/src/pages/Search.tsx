import React, { useState, useEffect } from "react"
import { useAlert } from "react-alert"
import "./css/Search.css"
import List from "../components/List"
import LoaderComp from "../components/Loader"
import { useNavigate } from "react-router-dom"

interface SearchProps {
	account: string | null
	login: boolean
}

const Search: React.FC<SearchProps> = ({ account, login }) => {
	const navigate = useNavigate()
	const alert = useAlert()
	const [search, setSearch] = useState<string>("")
	const [data, setData] = useState<[] | null>(null)
	const [loaded, setLoaded] = useState<boolean>(true)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	const url: string = `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(
		search
	)}+subject:fiction&printType=books&langRestrict=en&filter=ebooks&maxResults=40&key=AIzaSyDqMS-EjI89-vKlNLi50qFmNQeLcxLPPoI`
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
	useEffect(() => {
		let d = window.localStorage.getItem("searchData")
		if (d) {
			console.log("d :", d)
			setData(JSON.parse(d))
			setLoaded(true)
		}
	}, [])
	const handleSearch = async (e: React.MouseEvent) => {
		setData(null)
		e.preventDefault()
		setLoaded(false)

		let response = await fetch(url).catch((err: object) => {
			console.error(err)
		})
		if (response) {
			let books = await response.json()
			let stringedData: string = JSON.stringify(books.items)
			window.localStorage.setItem("searchData", stringedData)
			setData(books.items)
			setLoaded(true)
		}
	}
	return (
		<>
			<div className="modal-load">{!loaded && <LoaderComp />}</div>
			<div className="search">
				<form>
					<h1>{account}</h1>
					<label htmlFor="search-input">Search Book</label>
					<input
						onChange={handleChange}
						id="search-input"
						type="text"
						value={search}
					/>
					<input onClick={handleSearch} type="submit" value="Search" />
				</form>

				{data && <List data={data} />}
			</div>
		</>
	)
}
export default Search
