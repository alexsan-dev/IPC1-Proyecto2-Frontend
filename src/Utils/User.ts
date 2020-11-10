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

// BORRAR USUARIO
export const deleteUser = async (username: string) => {
	const req = await fetch(ENDPOINT + '/user/' + username, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': window.location.href,
		},
	})
	const data: string = (await req.text()) as string
	return data
}

// ACTUALIZAR USUARIO
export const updateUser = async (username: string, dataRef: User | null) => {
	const req = await fetch(ENDPOINT + '/user/' + username, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': window.location.href,
		},
		body: JSON.stringify(dataRef),
	})
	const data: string = (await req.text()) as string
	return data
}

// CERRAR SESIÓN
export const logoutUser = (setUser: (user: User | null) => any) => {
	window.localStorage.removeItem('user')
	setUser(null)
}
