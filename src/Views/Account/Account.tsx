// REACT
import React, { ChangeEvent, MutableRefObject, useContext, useRef, useState } from 'react'

// ESTILOS
import Styles from './Account.module.scss'

// ASSETS
import Hero from 'Assets/account_hero.jpg'
import UserDraw from 'Assets/user.svg'

// CONTEXTO
import AuthContext from 'Context/AuthContext'

// ICONOS
import { Lock, PenTool, Save, Trash, User, UserPlus } from 'react-feather'

// UTILS
import getUser, { deleteUser, updateUser } from 'Utils/User'

// COMPONENTES
import Button from 'Components/Button/Button'

const AccountView = () => {
	// CONTEXTO
	const { user } = useContext(AuthContext)

	// REFERENCIAS
	const dataRef: MutableRefObject<User | null> = useRef(user ? { ...user } : null)

	// ESTADO
	const [dataState, setData] = useState<User | null>(user ? { ...user } : null)

	// GUARDAR DATOS
	const saveData = (key: string) => (ev: ChangeEvent) => {
		// VALOR
		const input: HTMLInputElement = ev.target as HTMLInputElement
		const value: string = input.value.trim()

		// ASIGNAR
		if (dataRef.current) dataRef.current[key] = value
		setData(dataRef.current ? { ...dataRef.current } : null)
	}

	// VALIDAR CAMBIO
	const validateChange: boolean = JSON.stringify(user) === JSON.stringify(dataState)

	// ACTUALIZAR DATOS
	const update = () => {
		if (user?.user_name)
			updateUser(user?.user_name, dataRef.current).then((body: string) => {
				if (body.startsWith('Error'))
					window.Alert({
						title: 'Ocurrió un error',
						body,
						type: 'error',
					})
				else if (dataRef.current?.user_name) {
					getUser(dataRef.current?.user_name).then((gUser: User) => {
						if (gUser) window.localStorage.setItem('user', JSON.stringify(gUser))
						window.Alert({
							title: 'Actualización',
							body,
							type: 'confirm',
							onConfirm: () => {
								window.location.reload()
							},
						})
					})
				}
			})
	}

	// BORRAR USUARIO
	const deleteS = () => {
		window.Alert({
			title: 'Borrar cuenta',
			body:
				'¿Realmente quieres borrar tu cuenta?, este proceso es irreversible y bajo tu propio riesgo.',
			type: 'confirm',
			onConfirm: () => {
				if (dataRef.current?.user_name)
					deleteUser(dataRef.current?.user_name).then((body: string) => {
						if (body.startsWith('Error'))
							window.Alert({
								title: 'Ocurrió un error',
								body,
								type: 'error',
							})
						else {
							window.localStorage.removeItem('user')
							window.Alert({
								title: 'Usuario borrado',
								body,
								fixed: true,
								type: 'confirm',
								onConfirm: () => {
									window.location.replace('/')
								},
							})
						}
					})
			},
		})
	}

	return (
		<div className={Styles.container}>
			<div className={Styles.header}>
				<img src={Hero} alt='Account Banner' />
				<div className={Styles.user}>
					<User />
					<h1>
						{user?.name} {user?.last_name}
						<p>@{user?.user_name}</p>
						<span>Información personal</span>
					</h1>
				</div>
			</div>
			<img src={UserDraw} alt='User' />
			<form>
				<label>
					<PenTool /> Nombre
					<input
						defaultValue={user?.name}
						type='text'
						name='name'
						id='name'
						onChange={saveData('name')}
					/>
				</label>
				<label>
					<UserPlus /> Apellido
					<input
						defaultValue={user?.last_name}
						type='text'
						name='last_name'
						id='last_name'
						onChange={saveData('last_name')}
					/>
				</label>
				<label>
					<User /> Nombre de usuario
					<input
						defaultValue={user?.user_name}
						type='text'
						name='user_name'
						id='user_name'
						onChange={saveData('user_name')}
					/>
				</label>
				<label>
					<Lock /> Contraseña
					<input
						defaultValue={user?.password}
						type='password'
						name='password'
						id='password'
						autoComplete='current-password'
						onChange={saveData('password')}
					/>
				</label>
			</form>
			<div className={Styles.actions}>
				<Button text='Eliminar cuenta' icon={<Trash />} onClick={deleteS} />
				<Button
					onClick={update}
					text='Guardar datos'
					icon={<Save />}
					className={validateChange ? Styles.disable : Styles.normal}
				/>
			</div>
		</div>
	)
}

export default AccountView
