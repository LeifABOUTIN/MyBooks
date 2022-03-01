import React, { useState } from "react"
import "./css/Search.css"
import List from "../components/List"
import LoaderComp from "../components/Loader"

interface SearchProps {}

const Search: React.FC<SearchProps> = ({}) => {
	const [search, setSearch] = useState<string>("")
	const [data, setData] = useState<[] | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(e.target.value)
	}

	const url: string = `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(
		search
	)}+subject:fiction&printType=books&langRestrict=en&filter=ebooks&maxResults=39&key=AIzaSyDqMS-EjI89-vKlNLi50qFmNQeLcxLPPoI`

	const handleSearch = async (e: React.MouseEvent) => {
		e.preventDefault()
		setLoading(true)

		let response = await fetch(url).catch((err: object) => {
			console.error(err)
		})
		if (response) {
			let books = await response.json()
			setData(books.items)
			setLoading(false)
		}
	}
	return (
		<div className="search">
			<LoaderComp />
			<form>
				<label htmlFor="search-input">Search Book</label>
				<input
					onChange={handleChange}
					id="search-input"
					type="text"
					value={search}
				/>
				<input onClick={handleSearch} type="submit" />
			</form>

			{data ? (
				<List data={data} />
			) : !data && loading ? (
				<LoaderComp />
			) : null}
		</div>
	)
}
export default Search