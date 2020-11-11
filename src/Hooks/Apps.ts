import { useEffect } from 'react'

// UTILS
import { readApps } from 'Utils/Apps'

const useApps = (setApps: (appsData: AppData[]) => any) => {
	useEffect(() => {
		readApps().then((data: ResApps) => setApps(data.apps))
	}, [setApps])
}

export default useApps
