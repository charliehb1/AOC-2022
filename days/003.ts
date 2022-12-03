import fs from 'fs'

const splitRows = (input: string): string[] => {
	const midpoint = input.length / 2
	const firstHalf = input.slice(0, midpoint)
	const secondHalf = input.slice(midpoint)
	return [firstHalf, secondHalf]
}

const findCommonLetters = (firstHalf: string, secondHalf: string): string[] => {
	const commonLetters: string[] = []
	const firstHalfLetters = firstHalf.split('')
	const secondHalfLetters = secondHalf.split('')
	firstHalfLetters.map((letter) => {
		if (
			secondHalfLetters.includes(letter) &&
			!commonLetters.includes(letter)
		) {
			commonLetters.push(letter)
		}
	})
	return commonLetters
}

const getLetterValue = (letter: string): number => {
	const letterValue = letter.charCodeAt(0)
	if (letterValue >= 65 && letterValue <= 90) {
		return letterValue - 38
	} else if (letterValue >= 97 && letterValue <= 122) {
		return letterValue - 96
	} else {
		return 0
	}
}

const calc = () => {
	const file = fs.readFileSync('./inputs/003.txt', 'utf-8')
	const rows = file.split('\n')
	const commonLetters = rows.map((row) => {
		const parts = splitRows(row)
		return findCommonLetters(parts[0], parts[1])
	})
	const commonLettersArray = commonLetters.join().split('')
	const letterValues = commonLettersArray.map((letter) =>
		getLetterValue(letter),
	)
	const totalLetterValues = letterValues.reduce((a, b) => a + b, 0)
	console.log(totalLetterValues)
}

const calc2 = () => {
	const file = fs.readFileSync('./inputs/003.txt', 'utf-8')
	const rows = file.split('\n')
	// Split the rows up in to groups of 3
	const commonLetters: string[] = []
	for (let i = 0; i < rows.length; i += 3) {
		commonLetters.push(
			findCommonLetters(
				findCommonLetters(rows[i], rows[i + 1]).join(''),
				rows[i + 2],
			).join(''),
		)
	}
	const letterValues = commonLetters.map((letter) => getLetterValue(letter))
	const totalLetterValues = letterValues.reduce((a, b) => a + b, 0)
	console.log(totalLetterValues)
}

calc2()
