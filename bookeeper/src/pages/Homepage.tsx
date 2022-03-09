import React, { useEffect } from "react"
import "./css/Homepage.css"
import { AiFillTwitterCircle, AiFillLinkedin, AiFillMail } from "react-icons/ai"
import { CgPlayBackwards } from "react-icons/cg"
import { gsap } from "gsap"

interface homepageProps {}

const Homepage: React.FC<homepageProps> = ({}) => {
	let TL: gsap.core.Timeline

	useEffect(() => {
		let title = document.querySelector(".homepage_title") as HTMLElement
		let header = document.querySelector("header") as HTMLElement
		let footer = document.querySelector("footer") as HTMLElement

		let period = document
			.querySelector(".homepage_title")!
			.querySelector("span") as HTMLElement
		TL = gsap.timeline({ ease: "power2.out" })

		TL.fromTo(
			title,
			{
				opacity: 0,
				y: -1000,
			},
			{
				y: 0,
				opacity: 1,
				duration: 1.25,
			}
		)
			.fromTo(
				period,
				{ y: -500, opacity: 1 },
				{ y: 0, ease: "bounce.out", duration: 1.5 }
			)

			.fromTo(header, { y: "-100%" }, { y: 0 }, "-=1.25")

			.to(period, { color: "#622F22" }, "-=.75")

			.to(title, { color: "#eec8b1" }, "-=.75")
			.to(".h2", {
				background: "rgba(98, 47, 34, 0.5)",

				duration: 2,
			})
			.fromTo(
				".homepage_anim",
				{ opacity: 0, x: -100 },
				{
					opacity: 1,
					stagger: 0.4,
					ease: "elastic.out(2, 0.3)",
					duration: 1,
					x: 0,
				},
				"-=.75"
			)
			.fromTo(footer, { y: "120%" }, { y: 0 }, "-=1.25")

			.to(".homepage_playback", { opacity: 1 })
	}, [])
	const handleTLReverse = () => {
		TL.timeScale(2)
		TL.reverse()
	}
	return (
		<div className="homepage_container">
			{/* <Welcome /> */}
			<CgPlayBackwards
				onClick={() => handleTLReverse()}
				className="homepage_playback"
			/>
			<div className="homepage_image"></div>
			{/* <img src={book} alt="book in background" className="homepage_image" /> */}
			<h1 className="homepage_title">
				Bookeeper<span>.</span>
			</h1>
			<div className="h2">
				<h2 className="homepage_anim">Look</h2>
				<h2 className="homepage_anim">Add</h2>
				<h2 className="homepage_anim">Share</h2>
			</div>
			<footer className="homepage_footer">
				<a
					href="https://www.linkedin.com/in/leif-boutin-34a275109/"
					target="_blank"
				>
					<AiFillLinkedin className="contact" />
				</a>
				<a href="https://twitter.com/BoutinLeif" target="_blank">
					<AiFillTwitterCircle className="contact" />
				</a>
				<a href="mailto:leif.k.boutin@gmail.com">
					<AiFillMail className="contact" />
				</a>
			</footer>
		</div>
	)
}
export default Homepage
