import React from "react";
import { Link } from "react-router-dom";

export function CardItems({ obj, isCatalog, isTopSales }) {
	return (
		<div className={!isCatalog ? "col-4" : "catalog-item-card"}>
			<div className={!isTopSales ? "card" : "card categories-card"}>
				<div className="img-container">
					<img src={obj.images[0]}
						className="card-img-top img-fluid" alt="Босоножки 'MYER'"/>
				</div>
				<div className="card-body">
					<p className="card-text">{obj.title}</p>
					<p className="card-text">{obj.price + " руб."}</p>
					<Link to={`/catalog/${obj.id}`} relative="/" className="btn btn-outline-primary">Заказать</Link>
				</div>
			</div>
		</div>
	)
}