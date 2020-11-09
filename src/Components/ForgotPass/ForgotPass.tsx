// REACT
import React, { ChangeEvent } from 'react'

// ESTILOS
import Styles from './Forgot.module.scss'

// UTILS
import { requestPass } from 'Utils/Auth'

const ForgotPass = () => {
	// GUARDAR
	let nameRef: string = ''
	const saveData = (ev: ChangeEvent) => {
		const input = ev.target as HTMLInputElement
		const val = input.value
		nameRef = val
	}

	// INPUT
	const nameInput = (
		<input
			type='text'
			name='name'
			id='name'
			placeholder='Nombre de usuario'
			autoComplete='user-name'
			className={Styles.input}
			onChange={saveData}
		/>
	)

	// ALERTA
	window.Alert({
		title: 'Nombre de usuario',
		body: 'Ingresa el nombre de usuario con el que te registrarte anteriormente.',
		customElements: nameInput,
		type: 'confirm',
		onConfirm: () => {
			requestPass(nameRef).then((text: string) => {
				window.Alert({
					title: 'Ocurrió un error',
					body: text,
					type: text.startsWith('Error') ? 'error' : 'alert',
				})
			})
		},
	})
}

export default ForgotPass
