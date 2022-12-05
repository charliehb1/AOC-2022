import fs from 'fs'

const table = [ 
    ['F','C','P','G','Q','R'],
    ['W','T','C','P'],
    ['B','H','P','M','C'],
    ['L','T','Q','S','M','P','R'],
    ['P','H','J','Z','V','G','N'],
    ['D','P','J'],
    ['L','G','P','Z','F','J','T','R'],
    ['N','L','H','C','F','P','T','J'],
    ['G','V','Z','Q','H','T','C','W'],
]

const moveBoxes = (from: number, to: number, amount: number) => {
    for (let i = 0; i < amount; i++) {
        const box = table[from].pop() ?? ' '
        table[to].push(box)
    }
}

const moveBoxesPart2 = (from: number, to: number, amount: number) => {
    const boxes = table[from].splice(-amount)
    table[to].push(...boxes)
}

const calc = () => {
    const data = fs.readFileSync('./inputs/005.txt', 'utf8')
    const lines = data.split('\n')
    const dataset = lines.map(line => line.split(' '))
    dataset.map((row) => {
        const amount = parseInt(row[1])
        const from = parseInt(row[3])-1
        const to = parseInt(row[5])-1
        moveBoxesPart2(from, to, amount)
    })
    const result = table.map((row) => row[row.length-1])
    console.log(result.join(''))
}
calc()