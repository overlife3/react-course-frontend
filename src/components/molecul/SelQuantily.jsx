import React from "react";

export function SelQuantily({ prop }) {
	const [quant, setQuant] = prop

	const handleAddQuant = () => {
		setQuant(quant => ++quant)
	}

	const handlePickQuant = () => {
		setQuant(quant => --quant)
	}

	return (
		<p>Количество: 
			<span className="btn-group btn-group-sm pl-2">
				<button className="btn btn-secondary" onClick={handlePickQuant} disabled={quant <= 0}>-</button>
				<span className="btn btn-outline-primary">{quant}</span>
				<button className="btn btn-secondary" onClick={handleAddQuant} disabled={quant >= 10}>+</button>
			</span>
		</p>
	)
}