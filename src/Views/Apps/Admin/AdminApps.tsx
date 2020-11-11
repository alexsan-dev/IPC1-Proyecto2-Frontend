// REACT
import React, { useState, memo } from 'react'

// ASSETS
import Hero from 'Assets/hero_apps.jpg'
import AppsIcon from 'Assets/apps.svg'

// ESTILOS
import Styles from './AdminApps.module.scss'

// ICONOS
import { Upload } from 'react-feather'

// UTILS
import uploadFromInput, { readApps } from 'Utils/Apps'

// HOOKS
import useApps from 'Hooks/Apps'

// COMPONENTES
import AppComponent from 'Components/AppComponent/AppComponent'

const AdminApps = () => {
	// ESTADO
	const [apps, setApps] = useState<AppData[]>([])

	// OBTENER LISTA DE APPS
	useApps(setApps)

	// ACTUALIZAR ESTADO
	const updateApps = () => {
		readApps().then((resData: ResApps) => setApps(resData.apps))
	}

	return (
		<div className={Styles.container}>
			<div className={Styles.header}>
				<img src={Hero} alt='Hero' />
				<img src={AppsIcon} alt='Draw' />
				<h1>
					Administrar aplicaciones
					<p>Tienda de apps</p>
				</h1>
			</div>
			<div className={Styles.content}>
				<div className={Styles.upload}>
					<h2>Subir base de aplicaciones (CSV)</h2>
					<label htmlFor='apps-csv'>
						<Upload />
						Subir lista de apps
					</label>
					<input
						type='file'
						multiple={false}
						accept='.csv'
						id='apps-csv'
						onChange={uploadFromInput(setApps)}
					/>
				</div>
				<div className={Styles.editApps}>
					<h2>Editar aplicaciones</h2>
					{apps.map((app: AppData, key: number) => (
						<AppComponent key={key} appData={app} onUpdate={updateApps} />
					))}
				</div>
			</div>
		</div>
	)
}

export default memo(AdminApps)
