import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import LoaderComp from "../components/Loader"
import "./css/Book.css"

interface BookProps {}
interface data {
	img: string
	volumeInfo: {
		authors: string[]
		categories: string[]
		description: string
		imageLinks: {
			smallThumbnail: string
			thumbnail: string
			large: string
			extraLarge: string
			small: string
			medium: string
		}
		pageCount: number
		publishedDate: string
		title: string
		publisher: string
		previewLink: string
	}
}

const Book: React.FC<BookProps> = ({}) => {
	let { id } = useParams()
	const [data, setData] = useState<data | null>(null)
	const url = "https://www.googleapis.com/books/v1/volumes/"
	useEffect(() => {
		handleBookData()
	}, [id])
	const handleBookData = async () => {
		let response = await fetch(url + id)
		let data = await response.json()
		console.log(data)

		setData(data)
		console.log(data)
		let pDescription: HTMLElement | null =
			document.querySelector(".description")!
		pDescription.innerHTML = data.volumeInfo.description
	}
	return (
		<div className="container-book">
			{!data && <LoaderComp />}
			{data && (
				<>
					<div className="book-data">
						<div className="div-left">
							<h1>{data.volumeInfo.title}</h1>
							{data.volumeInfo.authors.map((author) => (
								<h3 key={Math.random() * 20}>{author}</h3>
							))}
							<div className="description-block">
								<h5>Description:</h5>
								<p className="description"></p>
							</div>
						</div>
						{data.volumeInfo.imageLinks && (
							<div className="div-right">
								<img
									className="book-image"
									alt="book cover"
									src={data.volumeInfo.imageLinks.medium.replace(
										"http",
										"https"
									)}
								/>
								<h5>Category</h5>
								<p>{data.volumeInfo.categories}</p>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	)
}
export default Book
