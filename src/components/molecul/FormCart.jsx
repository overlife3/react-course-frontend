import React, { useEffect, useState } from "react";
import { PopupLoading } from "./PopupLoading";
import requestRetry from "../../services/api/requestRetry"
import { PopupError } from "./PopupError";
import { useDispatch, useSelector } from "react-redux";
import { cartChangeItems } from "../../redux/cartReducer";
export function FormCart() {
	const cart = useSelector(store => store.cart)
	const arrWare = Array(...cart.items)
	const dispatch = useDispatch()
	const [request, setRequest] = useState({
		loading: false,
		body: undefined,
		error: undefined
	})
	const [formState, setFormState] = useState({
		phone: "",
		address: "",
		agreement: false
	})
	const [errorState, setErrorState] = useState({
		phone: "Обязательное поле",
		address: "Обязательное поле",
		agreement: "Обязательное поле"
	})
	const [formDirtyState, setFormDirtyState] = useState({
		phone: false,
		address: false,
		agreement: false
	})

	const [formValid, setFormValid] = useState()

	const handleSubmit = (e) => {
		e.preventDefault()
		setRequest(prev => ({...prev, loading: true}))

		const arrWareFilter = arrWare.map(item => ({
			id: Number(item.id),
			price: Number(item.price), 
			count: Number(item.quant)
		}))

		const data = {
			owner: {
				phone: formState.phone,
				address: formState.address
			},
			items: arrWareFilter
		}

		const res = requestRetry(`${process.env.REACT_APP_BASE_URL}order`, {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		}, 5)

		res
			.then(res => {
				setRequest(prev => ({...prev, loading: false}))
				dispatch(cartChangeItems([]))
			})
			.catch(res => setRequest(prev => ({...prev, loading: false, error:res})))		
	}

	const handlePhone = (e) => {
		setFormState(prev => ({...prev, phone: e.target.value}))
		if (e.target.value === "") {
			setErrorState(prev => ({...prev, phone: "Введите телефон"}))
		} else if (!/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\-]{7,10}$/.test(e.target.value)) {
			setErrorState(prev => ({...prev, phone: "Неправильно набран номер"}))
		} else {
			setErrorState(prev => ({...prev, phone: ""}))
		}
	}

	const handleAddress = (e) => {
		setFormState(prev => ({...prev, address: e.target.value}))	
		if (e.target.value === "") {
			setErrorState(prev => ({...prev, address: "Введите адресс"}))
		} else if (e.target.value.length < 5) {
			setErrorState(prev => ({...prev, address: "Слишком короткий адресс"}))
		} else if (!/^[а-яА-Я0-9.,;/]+$/.test(e.target.value)) {
			setErrorState(prev => ({...prev, address: "Имеются недопустимые символы"}))
		} else {
			setErrorState(prev => ({...prev, address: ""}))
		}
	}

	const handleAgreement = (e) => {
		setFormState(prev => ({...prev, agreement: e.target.checked}))	
		setFormDirtyState(prev => ({...prev, agreement: true}))
		if (!e.target.checked) {
			setErrorState(prev => ({...prev, agreement: "Обязательное поле"}))
		} else {
			setErrorState(prev => ({...prev, agreement: ""}))
		}
	} 

	const handleClose = () => {
		setRequest(prev => ({...prev, error: undefined}))
	}

	const handleBlur = (e) => {
		switch (e.target.id) {
			case "phone":
				setFormDirtyState(prev => ({...prev, phone: true}))
				break
			case "address":
				setFormDirtyState(prev => ({...prev, address: true}))
				break
			default:
				return
		}
	}

	useEffect(() => {
		const {phone, address, agreement} = errorState
		if (phone || address || agreement) {
			setFormValid(false)
		} else {
			setFormValid(true)
		}
	}, [errorState.phone, errorState.address, errorState.agreement])
	
	return (
		<>
			<section className="order">
				<h2 className="text-center">Оформить заказ</h2>
				<div className="card form-cart">
					<form className="card-body form" onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="phone">Телефон</label>
							<input
								value={formState.phone}
								onChange={handlePhone}
								onBlur={handleBlur}
								className="form-control"
								id="phone"
								placeholder="Ваш телефон"
								/>
								{(formDirtyState.phone && errorState.phone) && <div className="error-field">{errorState.phone}</div>}
						</div>
						<div className="form-group">
							<label htmlFor="address">Адрес доставки</label>
							<input
								value={formState.address}
								onChange={handleAddress}
								onBlur={handleBlur}
								id="address"
								className="form-control"
								placeholder="Адрес доставки"
								/>
								{(formDirtyState.address && errorState.address) && <div className="error-field">{errorState.address}</div>}
						</div>
						<div className="form-group form-check">
							<input
								value={formState.agreement}
								onChange={handleAgreement}
								
								type="checkbox"
								className="form-check-input"
								id="agreement"
							/>
							<label className="form-check-label" htmlFor="agreement">
								Согласен с правилами доставки
							</label>
							{(formDirtyState.agreement && errorState.agreement) && <div className="error-field">{errorState.agreement}</div>}
						</div>
						<button type="submit" className="btn btn-outline-secondary" disabled={!formValid || request.loading}>
							Оформить
						</button>
						{request.loading && <PopupLoading>Подождите, идет загрузка.</PopupLoading>}
						{request.error && !request.loading && <PopupError handleSubmit={handleSubmit} handleClose={handleClose}>Произошла ошибка<br />Пожалуйста повторите попытку</PopupError>}
					</form>
				</div>
			</section>
		</>
	)
}