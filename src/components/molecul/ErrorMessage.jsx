import React from "react";

export function ErrorMessage({children}) {
	return(
		<div className="error-notification notification">
			{children}
		</div>
	)
}