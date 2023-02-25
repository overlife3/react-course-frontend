import React, {useEffect} from "react";
import { Catalog } from "../molecul/Catalog";
import { TopSales } from "../molecul/TopSales";
import { useDispatch } from "react-redux";
import {catalogChangeHeader} from "../../redux/catalogReducer"

export function HomePage() {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(catalogChangeHeader())
	}, [])

	return (
		<main className="container">
		<div className="row">
			<div className="col">
				<section className="top-sales">
					<h2 className="text-center">Хиты продаж!</h2>
					<TopSales />
				</section>
				<section className="catalog">
					<h2 className="text-center">Каталог</h2>
					<Catalog key={Math.random()} />
				</section>
			</div>
		</div>
	</main>
	)
} 