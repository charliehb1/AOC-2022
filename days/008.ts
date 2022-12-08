import fs from 'fs'

let layout: number[][] = []
let visible: number[][] = []
let scenicScores: number[] = []

const calc = () => {
    const input = fs.readFileSync('./inputs/008.txt', 'utf8')
    const lines = input.split('\n')
    lines.map((line) => {
        const row = line.split('')
        let tempArray: number[] = []
        row.map((char) => {
            tempArray.push(parseInt(char))
        })
        layout.push(tempArray)
    })
    for (let i = 0; i < layout.length; i++) {
        visible.push([])
        for (let j = 0; j < layout[i].length; j++) {
            visible[i].push(0)
        }
    }
    for (let i = 0; i < layout.length; i++) {
        for (let j = 0; j < layout[i].length; j++) {
            if (i === 0 || i === layout.length - 1 || j === 0 || j === layout[i].length - 1) {
                visible[i][j] = 1
            }
        }
    }
    // For all interior trees calculate if they are visible
    for (let i = 1; i < layout.length - 1; i++) { // X
        for (let j = 1; j < layout[i].length - 1; j++) { // Y
            let allSmallerUp = true
            let up = 0
            let down = 0
            let left = 0
            let right = 0
            for (let k = i - 1; k >= 0; k--) {
                if (layout[k][j] >= layout[i][j]) {
                    up++
                    allSmallerUp = false
                    break
                }
                up++
            }
            let allSmallerDown = true
            for (let k = i + 1; k < layout.length; k++) {
                if (layout[k][j] >= layout[i][j]) {
                    down++
                    allSmallerDown = false
                    break
                }
                down++
            }
            let allSmallerLeft = true
            for (let k = j - 1; k >= 0; k--) {
                if (layout[i][k] >= layout[i][j]) {
                    left++
                    allSmallerLeft = false
                    break
                }
                left++
            }
            let allSmallerRight = true
            for (let k = j + 1; k < layout[i].length; k++) {
                if (layout[i][k] >= layout[i][j]) {
                    right++
                    allSmallerRight = false
                    break
                }
                right++
            }
            scenicScores.push(up * down * left * right)

            if (allSmallerUp || allSmallerDown || allSmallerLeft || allSmallerRight) {
                visible[i][j] = 1
            }
        }
    }
    const visibleTrees = visible.reduce((acc, val) => acc + val.reduce((acc, val) => acc + val, 0), 0)
    console.log(Math.max(...scenicScores))
}

calc()