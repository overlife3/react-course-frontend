import React, { useEffect, useState } from "react";
import { Preloader } from "./Preloader";
import { CardItems } from "./CardItems";
import requestRetry from "../../services/api/requestRetry";
import { ErrorMessage } from "./ErrorMessage";

export function TopSales() {
	const [state, setState] = useState({
		loading: true,
		error: false,
		body: null
	})

	useEffect(() => {
		requestRetry(`${process.env.REACT_APP_BASE_URL}top-sales`, {method: "GET"}, 5)
			.then(res => setState(prev => ({...prev, loading: false, body: res})))
			.catch(err => setState(prev => ({...prev, loading: false, error: err})))
	}, [])

	return (
		<>
			{state.loading && <Preloader />}
			{state.error && <ErrorMessage>Что-то пошло не так!</ErrorMessage>}
			{!state.loading && !state.error && 
				<div className="row">
					{state.body.map(item => <CardItems key={item.id + "top-sales"} obj={item} isTopSales />)}
				</div>}
		</>
	)
}