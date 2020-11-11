interface AppData {
	[index: string]: string | undefined | number
	id: number
	title: string
	url: string
	category?: string
	downloads?: number
	description: string
	price?: number
	likes?: number
	comments?: string[]
}

interface ResApps {
	apps: AppData[]
}
