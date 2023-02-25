import React from "react";

export function Preloader({ofPage}) {
	if (ofPage)
		return (
			<div className="top-sales">
				<div className="preloader ">
					<span></span>
					<span></span>
					<span></span>
					<span></span>
				</div>
			</div>
	)
	return (
			<div className="preloader ">
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
	)
}