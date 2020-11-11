// REACT
import React, { useContext } from 'react'

// VIEWS
import AdminApps from 'Views/Apps/Admin/AdminApps'

// CONTEXTO
import AuthContext from 'Context/AuthContext'

const Apps = () => {
	// CONTEXTO
	const { user } = useContext(AuthContext)

	return <div>{user?.type === 'admin' && <AdminApps />}</div>
}

export default Apps
