import { ChangeEvent } from 'react'

const CSVToArray = (strData: string, strDelimiter: string = ',') => {
	// EXPRESIONES
	let objPattern: RegExp = new RegExp(
		'(\\' +
			strDelimiter +
			'|\\r?\\n|\\r|^)' +
			'(?:"([^"]*(?:""[^"]*)*)"|' +
			'([^"\\' +
			strDelimiter +
			'\\r\\n]*))',
		'gi'
	)

	// DATOS
	let arrData: string[][] = [[]]
	let arrMatches = null

	// LEER
	while ((arrMatches = objPattern.exec(strData))) {
		// INICIAR
		let strMatchedDelimiter = arrMatches[1]
		if (strMatchedDelimiter.length && strMatchedDelimiter !== strDelimiter) arrData.push([])

		// VALIDAR
		let strMatchedValue = ''
		if (arrMatches[2]) strMatchedValue = arrMatches[2].replace(new RegExp('""', 'g'), '"')
		else strMatchedValue = arrMatches[3]

		// AGREGAR
		arrData[arrData.length - 1].push(strMatchedValue)
	}

	return arrData
}

export default CSVToArray

// LEER ARCHIVO DE INPUT
export const readFiles: (ev: ChangeEvent) => Promise<string[][]> = (ev: ChangeEvent) =>
	new Promise(resolve => {
		// ARCHIVO
		const inp = ev.target as HTMLInputElement
		const file: File | null = inp.files ? inp.files[0] : null

		// FILE READER
		const reader = new FileReader()

		// CARGAR
		reader.onload = event => {
			const rows = event.target?.result?.toString()
			if (rows) {
				// DATOS
				const data: string[][] = CSVToArray(rows)
				resolve(data)
			}
		}

		// LEER
		if (file) reader.readAsText(file)
	})
