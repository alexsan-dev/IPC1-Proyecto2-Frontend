// REACT
import React, { ChangeEvent, FormEvent, MutableRefObject, useContext, useRef } from 'react'

// ESTILOS
import Styles from './Login.module.scss'

// COMPONENTES
import ForgotPass from 'Components/ForgotPass/ForgotPass'
import Button from 'Components/Button/Button'

// UTILS
import reqLogin from 'Utils/Auth'
import getUser from 'Utils/User'

// CONTEXTO
import AuthContext from 'Context/AuthContext'

// DATOS POR DEFECTO
const defData: LoginData = {
	user_name: '',
	password: '',
}

// PROPIEDADES
interface LoginProps {
	onSigning: () => any
}

const Login: React.FC<LoginProps> = (props: LoginProps) => {
	// CONTEXTO
	const { setUser } = useContext(AuthContext)

	// REFERENCIAS
	const dataRef: MutableRefObject<LoginData> = useRef(defData)

	// ENVIAR
	const sendForm = (ev: FormEvent) => {
		ev.preventDefault()

		// DATOS
		if (dataRef.current.user_name.length && dataRef.current.password.length)
			reqLogin(dataRef.current).then((body: string) => {
				window.Alert({
					title: 'Ocurrió un error',
					body,
					type: body.startsWith('Error') ? 'error' : 'alert',
				})

				// GUARDAR
				if (!body.startsWith('Error'))
					getUser(dataRef.current.user_name).then((user: User) => {
						window.localStorage.setItem('user', JSON.stringify(user))
						setUser(user)
					})
			})
	}

	// GUARDAR DATOS
	const saveData = (key: string) => (ev: ChangeEvent) => {
		// VALOR
		const input: HTMLInputElement = ev.target as HTMLInputElement
		const value: string = input.value.trim()

		// ASIGNAR
		dataRef.current[key] = value
	}

	return (
		<form className={Styles.form} onSubmit={sendForm}>
			<h2>Bienvenido</h2>
			<span>
				Es un gusto verte de nuevo, ¿Quieres iniciar sesión?, Si no tienes una cuenta puedes crear
				una cuenta gratuita.
			</span>
			<input
				type='text'
				name='name'
				id='name'
				placeholder='Nombre de usuario'
				autoComplete='user-name'
				onChange={saveData('user_name')}
			/>
			<input
				type='password'
				name='pass'
				placeholder='Contraseña'
				id='pass'
				autoComplete='current-password'
				onChange={saveData('password')}
			/>
			<button onClick={ForgotPass} type='button'>
				¿Olvidaste tu contraseña?
			</button>
			<div className={Styles.actions}>
				<Button type='button' text='Crear cuenta' outlined onClick={props.onSigning} />
				<Button text='Iniciar sesión' />
			</div>
		</form>
	)
}

export default Login
