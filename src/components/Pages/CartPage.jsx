import React from "react";
import { useSelector } from "react-redux";
import { FormCart } from "../molecul/FormCart";
import { OrderTable } from "../molecul/OrderTable";
export function CartPage() {
	const { items, loading, error } = useSelector(store => store.cart)
	return (
		<>
			<OrderTable />
			{!error && !loading && 
				<>
					{items.length !== 0 && <FormCart />}
				</>}
		</>
	)
}