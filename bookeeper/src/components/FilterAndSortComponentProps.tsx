import React, { useState } from "react"

interface FilterAndSortComponentProps {
	data: []
	setFiltered: (a: any[]) => void
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

const FilterAndSortComponentProps: React.FC<FilterAndSortComponentProps> = ({
	data,
	setFiltered,
}) => {
	const [filterInput, setFilterInput] = useState<string>("")
	const filterData = (e: React.ChangeEvent<HTMLInputElement>): void => {
		if (e.target.value.length === 0) {
			setFilterInput("")
			return setFiltered([])
		}

		setFilterInput(e.target.value)

		if (filterInput) {
			let copy = [...data]
			let filter: any[] | null = copy.filter((d: data) =>
				d.volumeInfo.title.toLowerCase().includes(filterInput.toLowerCase())
			)
			setFiltered(filter)
		}
	}
	return (
		<>
			<span>by title</span>
			<input
				onChange={(e) => filterData(e)}
				type="text"
				value={filterInput}
			/>
		</>
	)
}
export default FilterAndSortComponentProps
