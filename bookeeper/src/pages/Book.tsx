import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useAlert } from "react-alert"
import LoaderComp from "../components/Loader"
import { BsFillArrowLeftCircleFill } from "react-icons/bs"
import { FaPlusCircle } from "react-icons/fa"
import "./css/Book.css"

interface BookProps {
	account: string | null
}
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
		subtitle: string
		publisher: string
		previewLink: string
		averageRating: number
	}
}

const Book: React.FC<BookProps> = ({ account }) => {
	const alert = useAlert()
	let { id } = useParams()
	const [data, setData] = useState<data | null>(null)
	const [loaded, setLoaded] = useState<boolean>(false)
	const url = "https://www.googleapis.com/books/v1/volumes/"
	let navigate = useNavigate()
	useEffect(() => {
		handleBookData()
	}, [id])
	useEffect(() => {
		if (!account) {
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
	}, [account])
	const handleBookData = async () => {
		let response = await fetch(url + id)
		let data = await response.json()

		setData(data)

		let pDescription: HTMLElement | null =
			document.querySelector(".description")!
		pDescription.innerHTML = data.volumeInfo.description
			? data.volumeInfo.description
			: "No data"

		//
	}
	const handleLoad = () => {
		console.log("here")
		document.querySelector(".container-book")!.classList.add("book-loaded")
		setLoaded(true)
	}
	const handleAddBook = async () => {
		console.log("add this book :", id)
		const payload = {
			account: account,
			book: id,
		}
		const response = await fetch("http://localhost:8080/add-book", {
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: JSON.stringify(payload),
		})
		const message = await response.json()
		if (response.status === 200) {
			alert.show(
				<div
					style={{
						padding: "1rem",
						fontFamily: "Roboto",
					}}
				>
					Book added successfully.
				</div>
			)
			return
		}
		alert.show(
			<div
				style={{
					color: "red",
					padding: "1rem",
					fontFamily: "Roboto",
				}}
			>
				{message ? message.message : "An error occured."}
			</div>
		)
	}
	return (
		<>
			<div className="modal-load">{!loaded && <LoaderComp />}</div>
			<div className="container-book">
				<BsFillArrowLeftCircleFill
					className="backBtn-book"
					onClick={() => navigate(-1)}
				/>
				<FaPlusCircle className="plusBtn-book" onClick={handleAddBook} />

				{data && (
					<>
						<div className="book-data">
							<div className="div-left">
								<h1>{data.volumeInfo.title}</h1>
								{data.volumeInfo.subtitle && (
									<blockquote className="book_subtitle">
										"{data.volumeInfo.subtitle}"
									</blockquote>
								)}

								{data.volumeInfo.authors.map((author) => (
									<h3 className="book_author" key={Math.random() * 20}>
										by {author}
									</h3>
								))}

								<div className="description-block">
									<h5>Description:</h5>
									<p className="description"></p>
								</div>
							</div>
							{data.volumeInfo.imageLinks && (
								<div className="div-right">
									<div className="block-top-right-infos">
										<h5>
											Date of publication:{" "}
											{data.volumeInfo.publishedDate}
										</h5>
										{data.volumeInfo.averageRating && (
											<h5>
												Average rating:{" "}
												{data.volumeInfo.averageRating}
												/5
											</h5>
										)}
									</div>
									<img
										onLoad={handleLoad}
										className="book-image"
										alt="book cover"
										src={
											data.volumeInfo.imageLinks.medium
												? data.volumeInfo.imageLinks.medium.replace(
														"http",
														"https"
												  )
												: data.volumeInfo.imageLinks.thumbnail
										}
									/>
									<h5>Category</h5>
									<p className="book-info-category">
										{data.volumeInfo.categories}
									</p>
								</div>
							)}
						</div>
					</>
				)}
			</div>
		</>
	)
}
export default Book
