// REACT
import React, { ComponentProps, useState } from 'react'

// CONTEXTO
import AuthContext from 'Context/AuthContext'

// HOOKS
import { useHistory } from 'react-router-dom'

let tmpPath: string = '/apps'
let count: number = 0
const AuthProvider: React.FC = (props: ComponentProps<'div'>) => {
	// ESTADO
	const [user, setUser] = useState<User | null>(null)

	// HISTORY
	const history = useHistory()
	const path = history.location.pathname
	if (count === 0) tmpPath = path
	count++

	// VALIDAR RUTA
	const validate = user === null && path !== '/'

	if (validate) history.replace('/')

	// LISTENER
	const userReq: string | null = window.localStorage.getItem('user')
	const cUser: User | null = userReq ? JSON.parse(userReq) : null

	// ACTUALIZAR ESTADO Y RUTA
	if (JSON.stringify(cUser) !== JSON.stringify(user)) setUser(cUser)
	if (cUser) history.push(tmpPath)
	if (tmpPath === '/' && cUser) history.push('/apps')

	return <AuthContext.Provider value={{ user, setUser }}>{props.children}</AuthContext.Provider>
}

export default AuthProvider
