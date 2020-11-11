import { ENDPOINT } from 'Env/Api'
import { ChangeEvent } from 'react'
import { readFiles } from './Tools'

const uploadApps = async (data: AppData[]) => {
	const req = await fetch(ENDPOINT + '/apps', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': window.location.href,
		},
		body: JSON.stringify({
			data,
		}),
	})
	const res: string = await req.text()
	return res
}

// LEER APPS
export const readApps = async () => {
	const req = await fetch(ENDPOINT + '/apps', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': window.location.href,
		},
	})
	const res: ResApps = (await req.json()) as ResApps
	return res
}

// ELIMINAR APP
export const deleteApp = async (title: string) => {
	const req = await fetch(ENDPOINT + '/apps/' + title, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': window.location.href,
		},
	})
	const res: string = (await req.text()) as string
	return res
}

// ACTUALIZAR APP
export const updateApp = async (title: string, appData: AppData) => {
	console.log(appData)
	const req = await fetch(ENDPOINT + '/apps/' + title, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			'Access-Control-Allow-Origin': window.location.href,
		},
		body: JSON.stringify(appData),
	})
	const res: string = (await req.text()) as string
	return res
}

// SUBIR APPS
const uploadFromInput = (setApps: (appsData: AppData[]) => any) => (ev: ChangeEvent) => {
	// ALERTA DE ESPERA
	window.Alert({
		title: 'Espera...',
		body: 'Estamos subiendo tus aplicaciones, no te salgas de la aplicación por favor.',
		type: 'window',
		fixed: true,
	})

	readFiles(ev).then((appsString: string[][]) => {
		// CREAR ARRAY DE APPS
		const appData: AppData[] = appsString.map((app: string[]) => ({
			id: parseInt(app[0], 10),
			title: app[1],
			url: app[2],
			category: app[3],
			downloads: parseInt(app[4], 10),
			description: app[5],
			price: parseInt(app[6], 10),
			likes: parseInt(app[7], 10),
		}))
		appData.shift()
		appData.pop()

		// SUBIR
		uploadApps(appData).then(() =>
			window.Alert({
				title: 'Apps subidas',
				body:
					'Tus aplicaciones se han cargado exitosamente, ahora podrás editarlas o eliminarlas desde la pagina de apps.',
				type: 'alert',
				onHide: () => {
					readApps().then((resData: ResApps) => setApps(resData.apps))
				},
			})
		)
	})
}

export default uploadFromInput
