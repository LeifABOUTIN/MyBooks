import React, { useState, useEffect } from "react"
import { BsArrowRightCircleFill } from "react-icons/bs"
import { FaPlusCircle } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import "./css/List.css"
import FilterAndSortComponentProps from "./FilterAndSortComponentProps"

interface ListProps {
	data: []
}
interface data {
	id: string
	volumeInfo: {
		title: string
		authors: string[]
		description: string
		imageLinks: {
			smallThumbnail: string
			thumbnail: string
		}
	}
}

const List: React.FC<ListProps> = ({ data }) => {
	console.log(data)
	const navigate = useNavigate()

	const handleBookClick = (e: React.MouseEvent) => {
		console.log(e.currentTarget.parentElement!.parentElement)
		navigate(`/book/${e.currentTarget.parentElement!.parentElement!.id}`)
	}
	const [filtered, setFiltered] = useState<any[]>(data)
	useEffect(() => {
		setTimeout(
			() => {
				document.querySelector(".list")!.classList.add("list-loaded")
			},

			500
		)
		setFiltered([...data])

		return () => {
			document.querySelector(".list")?.classList.remove("list-loaded")
		}
	}, [data])

	return (
		<>
			<FilterAndSortComponentProps data={data} setFiltered={setFiltered} />
			<motion.div
				layout
				animate={{ opacity: 1 }}
				initial={{ opacity: 0 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 1 }}
				className="list"
			>
				{filtered.length > 0
					? filtered.map((book: data) => (
							<div key={book.id} id={book.id}>
								<AnimatePresence key={book.id}>
									<motion.div
										layout
										className="book"
										id={book.id}
										key={book.id}
									>
										{/* <h3>
										{book.volumeInfo.title.length < 25
											? book.volumeInfo.title
											: book.volumeInfo.title.substr(0, 20) + "..."}
									</h3> */}
										{book.volumeInfo.imageLinks && (
											<img
												src={book.volumeInfo.imageLinks.thumbnail}
												alt="book cover"
											/>
										)}
										<div className="action">
											<BsArrowRightCircleFill
												onClick={handleBookClick}
												className="icons icon-arrow"
											/>
											<FaPlusCircle className="icons icon-plus" />
										</div>
									</motion.div>
								</AnimatePresence>
							</div>
					  ))
					: data.map((book: data) => (
							<div key={book.id} id={book.id}>
								<AnimatePresence>
									<motion.div
										transition={{ ease: "easeOut", duration: 1 }}
										layout
										className="book"
										id={book.id}
										key={book.id}
									>
										{/* <h3>
										{book.volumeInfo.title.length < 25
											? book.volumeInfo.title
											: book.volumeInfo.title.substr(0, 20) + "..."}
									</h3> */}

										{book.volumeInfo.imageLinks && (
											<img
												src={book.volumeInfo.imageLinks.thumbnail}
												alt="book cover"
											/>
										)}
										<div className="action">
											<BsArrowRightCircleFill
												onClick={handleBookClick}
												className="icons icon-arrow"
											/>
											<FaPlusCircle className="icons icon-plus" />
										</div>
									</motion.div>
								</AnimatePresence>
							</div>
					  ))}
			</motion.div>
		</>
	)
}
export default List
