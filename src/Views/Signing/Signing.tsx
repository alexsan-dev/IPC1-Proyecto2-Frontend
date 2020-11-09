// REACT
import React, { ChangeEvent, FormEvent, MutableRefObject, useRef, useContext } from 'react'

// ESTILOS
import Styles from './Signing.module.scss'

// COMPONENTES
import Button from 'Components/Button/Button'

// CONTEXTO
import AuthContext from 'Context/AuthContext'

// UTILS
import { reqSigning } from 'Utils/Auth'
import getUser from 'Utils/User'

// DATOS POR DEFECTO
const defData: SigningData = {
	name: '',
	last_name: '',
	user_name: '',
	password: '',
	type: 'user',
}

// PROPIEDADES
interface SigningProps {
	onLogin: () => any
}

const Signing: React.FC<SigningProps> = (props: SigningProps) => {
	// CONTEXTO
	const { setUser } = useContext(AuthContext)

	// REFERENCIAS
	const dataRef: MutableRefObject<SigningData> = useRef(defData)

	// ENVIAR
	const sendForm = (ev: FormEvent) => {
		ev.preventDefault()

		// DATOS
		if (dataRef.current.user_name.length && dataRef.current.password.length)
			reqSigning(dataRef.current).then((body: string) => {
				// GUARDAR
				if (!body.startsWith('Error'))
					getUser(dataRef.current.user_name).then((user: User) => {
						window.localStorage.setItem('user', JSON.stringify(user))
						setUser(user)
					})
				else
					window.Alert({
						title: 'Ocurrió un error',
						body,
						type: 'error',
					})
			})
	}

	// GUARDAR DATOS
	const saveData = (key: string) => (ev: ChangeEvent) => {
		// VALOR
		const input: HTMLInputElement = ev.target as HTMLInputElement
		const value: string = input.value.trim()

		// ASIGNAR
		if (key === 'full_name') {
			const namePars: string[] = value.split(' ')
			dataRef.current.name = namePars[0]
			dataRef.current.last_name = namePars[1]
		} else dataRef.current[key] = value
	}

	return (
		<form className={Styles.form} onSubmit={sendForm}>
			<h2>Crear cuenta</h2>
			<span>Registrate y conoce la mejor colección de aplicaciones para tu dispositivo.</span>
			<input
				type='text'
				name='fullName'
				id='fullName'
				placeholder='Nombre completo'
				onChange={saveData('full_name')}
			/>
			<input
				type='text'
				name='sName'
				id='sName'
				placeholder='Nombre de usuario'
				autoComplete='user-name'
				onChange={saveData('user_name')}
			/>
			<input
				type='password'
				name='sPass'
				placeholder='Contraseña'
				id='sPass'
				autoComplete='current-password'
				onChange={saveData('password')}
			/>
			<div className={Styles.actions}>
				<Button type='button' text='Iniciar sesión' outlined onClick={props.onLogin} />
				<Button text='Crear cuenta' />
			</div>
		</form>
	)
}

export default Signing
