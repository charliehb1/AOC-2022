import fs from 'fs'

const calcRange = (input: string): number[] => {
	const range = input.split('-')
	const min = parseInt(range[0])
	const max = parseInt(range[1])
	const rangeArray: number[] = []
	for (let i = min; i <= max; i++) {
		rangeArray.push(i)
	}
	return rangeArray
}

const subset = (inputa: string, inputb: string): boolean => {
	const a = inputa.split(',')
	const b = inputb.split(',')
	const overlapAB = a.some((element) => b.includes(element))
	const overlapBA = b.some((element) => a.includes(element))
	return overlapAB || overlapBA
}

const calc = () => {
	const rows = fs.readFileSync('./inputs/004.txt', 'utf-8').split('\n')
	const parts = rows.map((row) => {
		return row.split(',')
	})
	const ranges = parts.map((part) => {
		const elf1Range = calcRange(part[0])
		const elf2Range = calcRange(part[1])
		return [elf1Range.join(), elf2Range.join()]
	})
	let count = 0
	ranges.map((range) => {
		if (subset(range[0], range[1])) {
			count++
		}
	})
	console.log(count)
}

calc()
