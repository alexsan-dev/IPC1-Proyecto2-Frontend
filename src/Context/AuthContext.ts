import { createContext, Context } from 'react'

// KEYS
interface ContextProps {
	user: User | null
	setUser: (user: User | null) => any
}

// VALOR POR DEFECTO
const DefContext: ContextProps = { user: null, setUser: () => {} }

// CONTEXTO
const AuthContext: Context<ContextProps> = createContext(DefContext)

export default AuthContext
