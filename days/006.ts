import fs from 'fs'
const calc = () => {
    const data = fs.readFileSync('./inputs/006.txt', 'utf8')
    const lines = data.split('\n')
    const totalLength = lines[0].length
    for (let i = 13; i < totalLength; i++) {
        const chars = lines[0].slice(i-13, i+1)
        const uniqueChars = [...new Set(chars)]
        if (uniqueChars.length !== 14) {
            continue
        }
        if(uniqueChars.length === 14) {
            console.log(i+1)
            break
        }


    }
}
calc()
