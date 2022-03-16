import '../styles/menu.styles.css'
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Carousel() {
	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1
	};
	return (
		  <Slider classname="slider" {...settings}>
			<div>
			  <h1>OUR APP IS FAST</h1>
			</div>
			<div>
			  <h1>USER FRIENDLY</h1>
			</div>
			<div>
			  <h1>OPEN TO EVERYBODY</h1>
			</div>
			<div>
			  <h1>RESPECT GENDERS</h1>
			</div>
			<div>
			  <h1>ALL GENDERS</h1>
			</div>
			<div>
			  <h1>IT PERMIT YOU TO WIN MONEY IN INTERACTIVE BID</h1>
			</div>
		  </Slider>
	);
}


/*
export default function Menu() {
	return (
		<div classname="planet">
		<Planet
			centerContent={
				<div
					style={{
						height: 100,
						width: 100,
						borderRadius: '50%',
						backgroundColor: '#1da8a4',
					}}
				/>
			}
			open
			autoClose
		>
			<div
				style={{
					height: 70,
					width: 70,
					borderRadius: '50%',
					backgroundColor: '#9257ad',
				}}
			/>
			<div
				style={{
					height: 70,
					width: 70,
					borderRadius: '50%',
					backgroundColor: '#9257ad',
				}}
			/>
		</Planet>
		</div>
	);
} */