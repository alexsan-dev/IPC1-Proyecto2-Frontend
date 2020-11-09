// REACT
import React from 'react'

// ROUTER
import { BrowserRouter, Switch, Route } from 'react-router-dom'

// STRINGS
import Strings from 'Lang/Strings.json'

// CONTEXTO
import MainContext from 'Context/MainContext'
import AuthProvider from 'Providers/Auth'

// PAGINAS
import Index from 'Pages/Index/Index'

// INTERFACE
import { Es } from 'Env/Strings'

// ALERTAS
import withAlerts from '@weareluastudio/lualert'

// ESTADO
interface AppState {
	langCode: string
	lang: Es
}

// ESTADO POR DEFECTO
const DefState: AppState = {
	langCode: 'ES',
	lang: Strings.es,
}

const App: React.FC = () => {
	return (
		<MainContext.Provider value={{ ...DefState }}>
			<BrowserRouter>
				<AuthProvider>
					<Switch>
						<Route exact path='/' component={Index} />
					</Switch>
				</AuthProvider>
			</BrowserRouter>
		</MainContext.Provider>
	)
}

export default withAlerts(App, {
	confirmColor: '#8a7df7',
	errColor: '#d11335',
	blurred: true,
	confirmText: 'Aceptar',
	cancelText: 'Cancelar',
})
