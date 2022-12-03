import fs from 'fs'

const calc1 = () => {
	const mapping = {
		X: 'A',
		Y: 'B',
		Z: 'C',
	}
	const pointsMap = {
		A: 1,
		B: 2,
		C: 3,
	}
	const input = fs.readFileSync('./inputs/002.txt', 'utf8').split('\n')
	const inputPairs = input.map((string) => string.split(' '))
	let points = 0
	inputPairs.map((pair) => {
		const elf2Choice = mapping[pair[1] as keyof typeof mapping]
		points += pointsMap[elf2Choice as keyof typeof pointsMap]
		switch ([pair[0], elf2Choice].join('')) {
			case 'AB':
				points = points + 6
				break
			case 'BC':
				points = points + 6
				break
			case 'CA':
				points = points + 6
				break
		}
		if (pair[0] === elf2Choice) {
			points = points + 3
		}
	})
	console.log(`Points: ${points}`)
}

const calc2 = () => {
	const mapping = {
		X: 'A',
		Y: 'B',
		Z: 'C',
	}
	const WDL = {
		A: {
			// Rock
			X: 'C',
			Y: 'A',
			Z: 'B',
		},
		B: {
			// Paper
			X: 'A',
			Y: 'B',
			Z: 'C',
		},
		C: {
			// Scissors
			X: 'B',
			Y: 'C',
			Z: 'A',
		},
	}
	const pointsMap = {
		A: 1,
		B: 2,
		C: 3,
	}
	const input = fs.readFileSync('./inputs/002.txt', 'utf8').split('\n')
	const inputPairs = input.map((string) => string.split(' '))
	let points = 0
	inputPairs.map((pair) => {
		let elf2Choice = pair[1]

		switch (elf2Choice) {
			case 'X':
				elf2Choice = WDL[pair[0] as keyof typeof WDL]['X'] // Lose
				break
			case 'Y':
				elf2Choice = WDL[pair[0] as keyof typeof WDL]['Y'] // Draw
				points += 3
				break
			case 'Z':
				elf2Choice = WDL[pair[0] as keyof typeof WDL]['Z'] // Win
				points += 6
				break
		}
		switch (elf2Choice) {
			case 'A':
				points = points + 1
				break
			case 'B':
				points = points + 2
				break
			case 'C':
				points = points + 3
				break
		}
	})
	console.log(`Points: ${points}`)
}
calc2()
