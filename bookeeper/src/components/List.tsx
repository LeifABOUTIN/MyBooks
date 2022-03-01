import React from "react"
import { BsArrowRightCircleFill } from "react-icons/bs"
import { FaPlusCircle } from "react-icons/fa"
import "./css/List.css"

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
	return (
		<div className="list">
			{data.map((book: data) => (
				<div className="book" id={book.id} key={book.id}>
					<h3>{book.volumeInfo.title}</h3>

					{book.volumeInfo.imageLinks && (
						<img
							src={book.volumeInfo.imageLinks.thumbnail}
							alt="book cover"
						/>
					)}
					<BsArrowRightCircleFill className="icons" />
					<FaPlusCircle
						id={book.id}
						onClick={(e: React.MouseEvent) => {
							console.log(e.currentTarget.parentElement!.id)
						}}
						className="icons"
					/>
				</div>
			))}
		</div>
	)
}
export default List
