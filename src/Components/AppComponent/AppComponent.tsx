// REACT
import React, { memo } from 'react'

// ICONOS
import { Eye, PenTool, Trash } from 'react-feather'

// ESTILO
import Styles from './AppComponent.module.scss'

// UTILS
import { deleteApp } from 'Utils/Apps'
import AppViewer from './AppViewer'

// PROPIEDADES
interface AppComponentProps {
	appData: AppData
	onUpdate: () => any
}

// COMPONENTE
const AppComponent: React.FC<AppComponentProps> = ({ appData, onUpdate }: AppComponentProps) => {
	// BORRAR
	const deleteThis = (title: string) => () => {
		window.Alert({
			title: 'Borrar App',
			body:
				'Estas seguro de querer borrar esta App, este proceso es permanente y no hay vuelta atrás.',
			type: 'confirm',
			onConfirm: () =>
				deleteApp(title).then((body: string) => {
					window.Alert({
						title: 'Aplicación borrada',
						body,
						type: 'alert',
					})
					onUpdate()
				}),
		})
	}

	return (
		<div className={Styles.container}>
			<div className={Styles.columns}>
				<p>ID</p>
				<p>Nombre</p>
				<p>Descripción</p>
				<p>Precio</p>
				<p>Acciones</p>
			</div>
			<div className={Styles.row}>
				<p>{appData.id}</p>
				<p>{appData.title}</p>
				<p>{appData.description}</p>
				<p>{appData.price}</p>
				<div>
					<button onClick={AppViewer(appData, onUpdate)}>
						<Eye />
					</button>
					<button onClick={AppViewer(appData, onUpdate, true)}>
						<PenTool />
					</button>
					<button onClick={deleteThis(appData.title)}>
						<Trash />
					</button>
				</div>
			</div>
		</div>
	)
}

export default memo(AppComponent)
