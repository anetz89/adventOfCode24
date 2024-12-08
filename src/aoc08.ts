import  { readStringList } from './importer.ts';

function getAntennas(input: string[][]): Map<string, number[][]> {
    const antennas = new Map<string, number[][]>();

    input.forEach((r,ridx) => r.forEach((c, cidx) => {
        if (c !== '.') {
            if (!antennas.has(c)) {
                antennas.set(c, []);
            }
            antennas.get(c)!.push([ridx,cidx]);
        }
    }));
    return antennas;
}

function drawAntinodes(result: string[][], a: number[], b: number[], repeat=false): void {
    if (a.join(',') === b.join(',')) return;
    
    const r1 = b[0] + (b[0] - a[0]);
    const r2 = b[1] + (b[1] - a[1]);

    if (r1 < 0 || r1 >= result.length || r2 < 0 || r2 >= result[r1].length) {
        return;
    }
    result[r1][r2] = '#';

    if (repeat) drawAntinodes(result, b, [r1, r2], repeat);
}

function solve(input: string[][], repeat=false) {
    let result;

    if (repeat) {
        result = JSON.parse(JSON.stringify(input));
    } else {
        result = Array(input.length).fill(null).map(() => Array(input[0].length).fill("."))
    }

    let antennas = getAntennas(input);

    for(let row = 0; row < input.length; row++) {
        for(let col = 0; col < input[row].length; col++) {
            if (input[row][col] !== '.') {
                let partnerAntennas = antennas.get(input[row][col]);

                partnerAntennas!.forEach(pos => {
                    drawAntinodes(result, [row, col], pos, repeat);
                });
            }
        }
    }
    return result;
}

export function aoc_part1(): any {
    let input = readStringList('./assets/aoc08.txt').map(l => l.split(''));

    return solve(input).map(r => r.filter(c => c === '#').length).reduce((a, b) => a + b);
}

export function aoc_part2(): any {
    let input = readStringList('./assets/aoc08.txt').map(l => l.split(''));

    return solve(input, true).map(r => r.filter(c => c !== '.').length).reduce((a, b) => a + b);
}

