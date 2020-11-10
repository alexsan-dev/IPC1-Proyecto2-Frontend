// REACT
// REACT
import React, { useContext } from 'react'

// ESTILOS
import Styles from './SideBar.module.scss'

// CONTEXT
import AuthContext from 'Context/AuthContext'

// ICONOS
import { Grid, LogOut, Sliders, User } from 'react-feather'

// COMPONENTES
import Button from 'Components/Button/Button'

// UTILS
import { logoutUser } from 'Utils/User'
import { Link } from 'react-router-dom'

// RUTAS
const routes: string[] = ['Apps', 'Cuenta']
const icons: JSX.Element[] = [<Grid />, <Sliders />]

const SideBar: React.FC = () => {
	// CONTEXTO
	const { user, setUser } = useContext(AuthContext)

	// CERRAR SESIÓN
	const logout = () => {
		window.Alert({
			title: 'Estas seguro',
			body: 'Cerraras sesión en este dispositivo, se deshabilitara el inicio de sesión automático.',
			type: 'confirm',
			onConfirm: () => logoutUser(setUser),
		})
	}

	if (user)
		return (
			<div className={Styles.container}>
				<div className={Styles.user}>
					<User />
					<h2>
						{user.name} {user.last_name}
						<p>
							@{user.user_name}
							<Button onClick={logout} outlined text='Cerrar sesión' icon={<LogOut />} />
						</p>
					</h2>
				</div>

				<div className={Styles.routes}>
					{routes.map((route: string, key: number) => (
						<Link to={'/' + route.toLowerCase()} title={route} key={key}>
							{icons[key]}
							{route}
						</Link>
					))}
				</div>
			</div>
		)
	else return null
}

export default SideBar
