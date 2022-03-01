import React from "react"
import "./css/Loader.css"
interface LoaderCompProps {}

const LoaderComp: React.FC<LoaderCompProps> = ({}) => {
	return (
		<div className="loader-container">
			<div className="loader"></div>
		</div>
	)
}
export default LoaderComp
