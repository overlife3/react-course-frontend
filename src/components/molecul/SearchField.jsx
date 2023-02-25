import React, {useState, useRef, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { catalogChangeField } from "../../redux/catalogReducer";

export function SearchField() {
	const [inputValue, setInputValue] = useState('')
	const formEl = useRef(null)
	const dispatch = useDispatch(catalogChangeField())
	const catalogItems = useSelector(state => state.catalog)
	const params = {
		categoryId: catalogItems.categorie,
		q: catalogItems.field
	}
	
	useEffect(() => {
		setInputValue(catalogItems.field)
	}, [catalogItems.field])
	
	useEffect(() => {
		setInputValue(catalogItems.field)
	}, [])

	const handleValue = (e) => {
		setInputValue(e.target.value)
	}

	const handleSubmit = (e) => {
		dispatch(catalogChangeField({...params, q: inputValue}))
		e?.preventDefault()
	} 

	return(
		<form className="catalog-search-form form-inline" onSubmit={handleSubmit} ref={formEl}>
			<input className="form-control" placeholder="Поиск" value={inputValue} onChange={handleValue} />
		</form>
	)
}