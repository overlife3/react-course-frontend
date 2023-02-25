import React,{ useEffect } from "react";
import { Catalog } from "../molecul/Catalog";
import { SearchField } from "../molecul/SearchField";
import { useDispatch } from "react-redux";
import {catalogChangeHeader} from "../../redux/catalogReducer"

export function CatalogPage() {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(catalogChangeHeader())
	}, [])
	return (
		<section className="catalog">
			<div className="container">
				<h2 className="text-center">Каталог</h2>
				<SearchField />
				<Catalog key={Math.random()} ofCatalogPage/>
			</div>
		</section>
	)
} 