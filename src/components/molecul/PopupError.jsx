import React from "react";

export function PopupError({children, handleSubmit, handleClose}) {
	return (
		<div className="popup popup-error">
			<div className="popup-body">
			<div className="close" onClick={handleClose}>X</div>
				<h2>{children}</h2>
				<button type="submit" className="btn btn-outline-secondary" onClick={handleSubmit}>Повторить</button>
			</div>
		</div>
	)
}