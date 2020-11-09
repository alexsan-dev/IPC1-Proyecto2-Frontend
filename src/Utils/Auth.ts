import { ENDPOINT } from 'Env/Api'

// INICIAR LOGIN
const reqLogin = async (loginData: LoginData) => {
	const req = await fetch(ENDPOINT + '/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': window.location.href,
		},
		body: JSON.stringify(loginData),
	})
	const data: string = await req.text()
	return data
}
export default reqLogin

// RECUPERAR PASS
export const requestPass = async (username: string) => {
	const req = await fetch(ENDPOINT + '/forgot/' + username, {
		method: 'GET',
		headers: {
			'Access-Control-Allow-Origin': window.location.href,
		},
	})
	const data: string = await req.text()
	return data
}

// INICIAR SIGNING
export const reqSigning = async (signingData: SigningData) => {
	const req = await fetch(ENDPOINT + '/user', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': window.location.href,
		},
		body: JSON.stringify(signingData),
	})
	const data: string = await req.text()
	return data
}
