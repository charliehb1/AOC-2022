import fs from 'fs'

const calc = () => {
	let totals: number[] = []
	let sorted: number[] = []
	const input = fs
		.readFileSync('./inputs/001.txt', 'utf8')
		.split('\n\n')
		.map((string) => string.split('\n'))
		.map((array) => array.map((string) => parseInt(string)))
		.forEach((array) => {
			let total = 0
			array.forEach((num) => {
				total += num
			})
			totals.push(total)
		})
	sorted = totals.sort(function (a, b) {
		return b - a
	})
	console.log(
		`Largest: ${sorted[0]}, Top 3 added: ${
			sorted[0] + sorted[1] + sorted[2]
		}`,
	)
}
calc()
