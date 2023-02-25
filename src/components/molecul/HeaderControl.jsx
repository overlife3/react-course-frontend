import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom"; 
import { useDispatch, useSelector } from "react-redux";
import { catalogChangeField } from "../../redux/catalogReducer";
import { cartChangeItems } from "../../redux/cartReducer";

export function HeaderControl() {
	const {items: itemsCart} = useSelector(state => state.cart)
	const [visible, setVisible] = useState(false)
	const [inputValue, setInputValue] = useState('')
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const catalogItems = useSelector(state => state.catalog)
	const params = {
		categoryId: catalogItems.categorie,
		q: catalogItems.field
	}

	const handleValue = (e) => {
		setInputValue(e.target.value)
	}

	const handleSubmit = (e) => {
		dispatch(catalogChangeField({...params, q: inputValue}))
		e?.preventDefault()
	} 

	const handleClick = () => {
		if (visible) {
			handleVisible()
			navigate("/catalog")
			handleSubmit()
		} else {
			handleVisible()
		}
	}

	const handleVisible = () => {
		setVisible(prevState => !prevState)
	}

	return (
		<div>
			<div className="header-controls-pics">
				<div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={handleClick}></div>
				<Link to="/cart">
					<div className="header-controls-pic header-controls-cart">
						{itemsCart.length !== 0 && <div className="header-controls-cart-full">{itemsCart.length}</div>}
						<div className="header-controls-cart-menu"></div>
					</div>
				</Link>
			</div>

			{!visible ? null : 
				<form data-id="search-form" className="header-controls-search-form form-inline" onSubmit={handleSubmit}>
					<input className="form-control" placeholder="Поиск" value={inputValue} onChange={handleValue} />
				</form>}
		</div>
	)
}