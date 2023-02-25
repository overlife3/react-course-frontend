import React from "react";

export function RepeatBtnPage({onClick}) {
	return(
		<div className="repeat-btn-page top-sales">
			<button onClick={onClick} className="btn btn-outline-secondary">Повторить</button>
		</div>
	)
}