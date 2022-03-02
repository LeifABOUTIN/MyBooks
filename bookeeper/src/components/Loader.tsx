import React from "react"
import "./css/Loader.css"
interface LoaderCompProps {}

const LoaderComp: React.FC<LoaderCompProps> = ({}) => {
	return (
		<div className="loader-container">
			<h1>Loading</h1>
			<div className="loader"></div>
		</div>
	)
}
export default LoaderComp
