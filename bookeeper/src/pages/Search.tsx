import React, { useState, useEffect } from "react"
import "./css/Search.css"
import List from "../components/List"
import LoaderComp from "../components/Loader"

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
	const [search, setSearch] = useState<string>("")
	const [data, setData] = useState<[] | null>(null)
	const [loaded, setLoaded] = useState<boolean>(false)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	const url: string = `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(
		search
	)}+subject:fiction&printType=books&langRestrict=en&filter=ebooks&maxResults=40&key=AIzaSyDqMS-EjI89-vKlNLi50qFmNQeLcxLPPoI`

	useEffect(() => {
		let d = window.localStorage.getItem("searchData")
		if (d) {
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
