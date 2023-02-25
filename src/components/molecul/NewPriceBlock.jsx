import React from "react";

export function NewPriceBlock({ newPrice, oldPrice }) {
	if (newPrice > oldPrice) {
		return (
			<div className="new-price-block">
				<span className="red-new-price">{newPrice + " "}</span>
				<span className="old-price">{oldPrice}</span>
				<div className="message">
					Пока вы думали цена изменилась
				</div>
			</div>
		) 
	}

	if (newPrice < oldPrice) {
		return (
			<div className="new-price-block">
				<span className="green-new-price">{newPrice + " "}</span>
				<span className="old-price">{oldPrice}</span>
				<div className="message">
					Пока вы думали цена изменилась
				</div>
			</div>
		)
	}
}