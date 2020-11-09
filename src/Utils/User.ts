import { ENDPOINT } from 'Env/Api'

// OBTENER USUARIO
const getUser = async (username: string) => {
	const req = await fetch(ENDPOINT + '/user/' + username, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': window.location.href,
		},
	})
	const data: User = (await req.json()) as User
	return data
}
export default getUser
