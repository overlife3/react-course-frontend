const sleep = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms));
 }

const requestRetry = async( url, options, n = 1 ) => {
	try {
		return await fetch(url, options).then(res => {
			if (res.status === 204) return 
			return res?.json()})
	} catch (e) {
		if (n <= 1) throw new Error("Error server");
		await sleep(1000);
		n = n-1
		return await requestRetry(url, options, n)
	}
 }

export default requestRetry