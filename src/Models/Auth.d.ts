interface LoginData {
	[index: string]: string
	user_name: string
	password: string
}

interface SigningData {
	[index: string]: string
	name: string
	last_name: string
	user_name: string
	password: string
	type: 'user' | 'admin'
}
