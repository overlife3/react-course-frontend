import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export function DownloadMoreBtn({onClick, items}) {
	const [prevLenghtItems, setPrevLenghtItems] = useState(0)

	const { loading, categorie } = useSelector(state => state.catalog)
	let loadBtnUnVisible = loading || (items.length % 6 !== 0) || prevLenghtItems === items.length;
	
	useEffect(() => {
		setPrevLenghtItems(0)
	}, [categorie])

	if (loadBtnUnVisible) return null;
	
	return(
		<div className="text-center">
			<button className="btn btn-outline-primary" onClick={() => {onClick(); setPrevLenghtItems(items.length) }}>Загрузить ещё</button>
		</div>
	)
}