import fs from 'fs'

interface Directory {
    [key: string]:  number
}
interface SubDirectory {
    [key: string]: number
}
let cursor = ''
const directories: Directory = {
    '/': -1
}
const subDirectories: SubDirectory = {}
const calc = () => {
    const data = fs.readFileSync('./inputs/007.txt', 'utf-8');
    const lines = data.split('\n')
    lines.map(line => {
        if(line.startsWith('$')) {
            if(line === '$ cd ..') {
                cursor = cursor.substring(0, cursor.lastIndexOf('/'))
            }
            else if(line.startsWith('$ cd ')) {
                cursor += '/' + line.substring(5)
            }
        }
        else {
            if(line.startsWith('dir')) {
                const lineSplit = line.split(' ')
                const dirName = cursor+'/'+lineSplit[1]
                directories[dirName] = -1
            }
            else {
                const lineSplit = line.split(' ')
                const size = parseInt(lineSplit[0])
                if(subDirectories[cursor] === undefined) {
                    subDirectories[cursor] = size
                }
                else {
                    subDirectories[cursor] += size
                }
            }
        }
    })
    Object.keys(directories).map(dir => {
        const subDir = Object.keys(subDirectories).filter(subDir => subDir.startsWith(dir))
        let size = 0
        subDir.map(sub => {
            size += subDirectories[sub]
        })
        directories[dir] = size
    })
    let total = 0
    Object.keys(directories).map(dir => {
        if(directories[dir] < 100000) {
            total += directories[dir]
        }
    })
    total = directories['/']
    const desired = 30000000 - (70000000 - total)
    // Find the directory which is larger than the desired size but the smallest in the array
    const dir = Object.keys(directories).filter(dir => directories[dir] > desired).sort((a, b) => directories[a] - directories[b])[0]
    console.log(`dir: ${dir}`)
    console.log(`size: ${directories[dir]}`)
}
calc()


