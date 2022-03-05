import React, { useEffect } from "react"
import "./css/Homepage.css"
import { AiFillTwitterCircle, AiFillLinkedin, AiFillMail } from "react-icons/ai"
import { CgPlayBackwards } from "react-icons/cg"
import { gsap } from "gsap"
import book from "../imgs/book.png"

interface homepageProps {}

const Homepage: React.FC<homepageProps> = ({}) => {
	let TL: gsap.core.Timeline
	let TL2: gsap.core.Timeline

	useEffect(() => {
		let title = document.querySelector(".homepage_title") as HTMLElement
		let book = document.querySelector(".homepage_image") as HTMLImageElement
		let header = document.querySelector("header") as HTMLElement
		let a = document.querySelectorAll("a") as NodeListOf<HTMLAnchorElement>
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
			.fromTo(
				book,
				{
					scale: 0,
					rotationX: -60,
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
				},
				{ duration: 5, scale: 1.5, rotationX: 0, y: 0 },
				"-=3"
			)
			.fromTo(header, { y: "-100%" }, { y: 0 }, "-=1.25")

			.to(period, { color: "#622F22" }, "-=.75")
			.to(header, { background: "#622F22" }, "-=.75")

			.to(title, { color: "#eec8b1" }, "-=.75")
			.to(a, { color: "white" }, "-=.75")
			// .to(book, { scale: 0.8, duration: 2 })
			.fromTo(
				".homepage_anim",
				{ opacity: 0, x: -100 },
				{
					opacity: 1,
					stagger: 0.1,
					ease: "elastic.out(1, 0.3)",
					duration: 1,
					x: 0,
				},
				"-=.75"
			)
			.fromTo(footer, { y: "120%", background: "white" }, { y: 0 }, "-=1.25")
			.to(footer, { background: "#eec8b1" }, "-=.25")
			.to(".homepage_playback", { opacity: 1 })
	}, [])
	const handleTLReverse = () => {
		TL.reverse()
	}
	return (
		<div className="homepage_container">
			<CgPlayBackwards
				onClick={() => handleTLReverse()}
				className="homepage_playback"
			/>
			<img src={book} alt="" className="homepage_image" />
			<h1 className="homepage_title">
				Bookeeper<span>.</span>
			</h1>
			<div className="h2">
				<h2 className="homepage_anim">Look.</h2>
				<h2 className="homepage_anim">Add.</h2>
				<h2 className="homepage_anim">Share.</h2>
			</div>
			<footer className="homepage_footer">
				<a href="https://www.linkedin.com/in/leif-boutin-34a275109/ ">
					<AiFillLinkedin className="contact" />
				</a>
				<a href="https://twitter.com/BoutinLeif ">
					<AiFillTwitterCircle className="contact" />
				</a>
				<a href="mailto:leif.k.boutin@gmail.com ">
					<AiFillMail className="contact" />
				</a>
			</footer>
		</div>
	)
}
export default Homepage
