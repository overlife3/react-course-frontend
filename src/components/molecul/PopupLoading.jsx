import React from "react";
import { Preloader } from "./Preloader";

export function PopupLoading({ children }) {
	return (
		<div className="popup popup-loading">
		<div className="popup-body">
			<h2>{children}</h2>
			<Preloader />
		</div>
	</div>
	)
}