import React, { useState, useEffect } from "react"
import { BsArrowRightCircleFill } from "react-icons/bs"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import "./css/MyList.css"
import FilterAndSortComponentProps from "./FilterAndSortComponentProps"

interface ListProps {
	data: any[] | null
	account: string | null
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

const List: React.FC<ListProps> = ({ data, account }) => {
	const navigate = useNavigate()

	const handleBookClick = (e: React.MouseEvent) => {
		console.log(e.currentTarget.parentElement!.parentElement)
		navigate(`/book/${e.currentTarget.parentElement!.parentElement!.id}`)
	}
	const [filtered, setFiltered] = useState<any[] | null>(data)

	useEffect(() => {
		if (data) {
			setTimeout(
				() => {
					document
						.querySelector(".my-list")!
						.classList.add("my-list-loaded")
				},

				500
			)
			setFiltered([...data])
		}

		return () => {
			document.querySelector(".my-list")?.classList.remove("my-list-loaded")
		}
	}, [data])

	return (
		<>
			{data && (
				<FilterAndSortComponentProps
					data={data}
					setFiltered={setFiltered}
				/>
			)}
			<motion.div
				layout
				animate={{ opacity: 1 }}
				initial={{ opacity: 0 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 1 }}
				className={data !== null ? "my-list" : "empty-list"}
			>
				{filtered && filtered.length > 0
					? filtered.map((book: data) => (
							<div key={book.id} id={book.id}>
								<AnimatePresence key={book.id}>
									<motion.div
										layout
										className="book"
										id={book.id}
										key={book.id}
									>
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
										</div>
									</motion.div>
								</AnimatePresence>
							</div>
					  ))
					: data != null
					? data.map((book: data) => (
							<div key={book.id} id={book.id}>
								<AnimatePresence>
									<motion.div
										transition={{ ease: "easeOut", duration: 1 }}
										layout
										className="book"
										id={book.id}
										key={book.id}
									>
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
										</div>
									</motion.div>
								</AnimatePresence>
							</div>
					  ))
					: data && (
							<div className="no_data_my_bookeshelf">NO DATA FOUND</div>
					  )}
			</motion.div>
		</>
	)
}
export default List
