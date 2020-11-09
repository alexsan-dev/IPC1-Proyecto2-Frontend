// REACT
import React, { useState } from 'react'

// ASSETS
import AppL from 'Assets/login.svg'

// ESTILOS
import Styles from './Index.module.scss'

// COMPONENTES
import Signing from 'Views/Signing/Signing'
import Login from 'Views/Login/Login'

const Index: React.FC = () => {
	// ESTADO
	const [isLogin, setLogin] = useState<boolean>(true)

	// CAMBIAR DE FORMULARIO
	const changeUserForm = (first: boolean) => () => setLogin(first)

	return (
		<div className={Styles.container}>
			<div className={Styles.content}>
				<Signing onLogin={changeUserForm(true)} />
				<div
					className={Styles.banner}
					style={{ transform: `translateX(${isLogin ? '0' : '100%'})` }}>
					<img src={AppL} alt='banner' />
				</div>
				<Login onSigning={changeUserForm(false)} />
			</div>
		</div>
	)
}

export default Index
