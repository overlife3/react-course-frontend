export default function filterArrWare(arrWare) {
	//Проверяет до первого совпадения, потом сразу возвращает значение, потому что в корзину разом можно добавить только один товар (совпадение может быть только одно)
	const resArr = arrWare
	for (let i = 0; i < arrWare.length; i++) {
		for (let j = 0; j < arrWare.length; j++) {
			if (i !== j && arrWare[i].id === arrWare[j].id && arrWare[i].size === arrWare[j].size) {
				resArr[i] = ({...arrWare[i], quant: arrWare[i].quant + arrWare[j].quant})
				resArr.splice(j, 1)
				return resArr
			}
		}
	}
	return resArr
}
