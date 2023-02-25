import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import filterArrWare from "../../utils/filterStorage";
import { cartChangeItems } from "../../redux/cartReducer";

export function  InCartBtn({size, quant, wareInfo}) {
	const navigate = useNavigate()
	const dispatch = useDispatch()
	const cart = useSelector(state => state.cart)
	const items = Array(...cart.items)

	const handleClick = () => {
		let resArr

		if (!items) {
			resArr = [wareInfo]
		} else {
			items.push(wareInfo)
			resArr = filterArrWare(items)
		}
		dispatch(cartChangeItems(resArr))
		navigate("/cart")
	}
	return (
		<button
			className="btn btn-danger btn-block btn-lg"
			disabled={!size || quant === 0}
			onClick={handleClick}
		>
			В корзину
		</button>
	)
}