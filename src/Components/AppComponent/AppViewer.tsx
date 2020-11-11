// REACT
import React, { ChangeEvent } from 'react'
import { updateApp } from 'Utils/Apps'

// ESTILOS
import Styles from './AppComponent.module.scss'

const AppViewer = (appData: AppData, onUpdate: () => any, editable: boolean = false) => () => {
	// DATOS TEMPORALES
	const tempApp: AppData = { ...appData }

	// GUARDAR
	const saveData = (key: string) => (ev: ChangeEvent) => {
		// INPUT
		const input = ev.target as HTMLInputElement
		const val = input.value

		// GUARDAR
		tempApp[key] = val
	}

	// ACTUALIZAR
	const update = (title: string) => () =>
		updateApp(title, tempApp).then((body: string) => {
			if (body.startsWith('Error'))
				window.Alert({
					title: 'Ocurrió un error',
					body,
					type: 'error',
				})
			else
				window.Alert({
					title: 'App actualizada',
					body,
					type: 'alert',
					onHide: () => onUpdate(),
				})
		})

	// BOX
	const container = (
		<div className={Styles.viewer}>
			<img src={appData.url} alt='App' />
			<div className={Styles.viewerInfo}>
				<label>
					ID
					<input
						defaultValue={appData.id}
						disabled={!editable}
						type='number'
						name='id'
						placeholder='0'
						id='id'
						onChange={saveData('id')}
					/>
				</label>
				<label>
					Titulo
					<input
						defaultValue={appData.title}
						disabled={!editable}
						type='text'
						name='title'
						placeholder='Titulo'
						id='title'
						onChange={saveData('title')}
					/>
				</label>
				<label>
					Categoría
					<input
						defaultValue={appData.category}
						disabled={!editable}
						type='text'
						name='category'
						placeholder='Categoría'
						id='category'
						onChange={saveData('category')}
					/>
				</label>
				<label>
					Descargas
					<input
						disabled={!editable}
						defaultValue={appData.downloads}
						type='number'
						name='downloads'
						placeholder='Descargas'
						id='downloads'
						onChange={saveData('downloads')}
					/>
				</label>

				<label>
					Precio
					<input
						disabled={!editable}
						defaultValue={appData.price}
						type='number'
						name='price'
						placeholder='Precio'
						id='price'
						onChange={saveData('price')}
					/>
				</label>
				<label>
					Likes
					<input
						disabled={!editable}
						defaultValue={appData.likes}
						type='number'
						name='likes'
						placeholder='Likes'
						id='likes'
						onChange={saveData('likes')}
					/>
				</label>
				<label>
					Descripción
					<textarea
						disabled={!editable}
						defaultValue={appData.description}
						name='description'
						placeholder='Descripción'
						id='description'
						onChange={saveData('description')}
					/>
				</label>
			</div>
		</div>
	)

	// ALERTA
	window.Alert({
		title: '',
		body: '',
		type: 'confirm',
		customElements: container,
		onConfirm: editable ? update(appData.title) : undefined,
	})
}

export default AppViewer
