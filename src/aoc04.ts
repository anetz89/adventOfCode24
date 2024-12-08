import  { readStringList } from './importer.ts';

function lookRight(i: string[][], r: number, c: number): boolean { 
    return (c + 3 < i[r].length) && i[r][c] === 'X' && i[r][c + 1] === 'M' && i[r][c + 2] === 'A' && i[r][c + 3] === 'S';
}
function lookLeft(i: string[][], r: number, c: number): boolean { 
    return (c - 3 >= 0) && i[r][c] === 'X' && i[r][c - 1] === 'M' && i[r][c - 2] === 'A' && i[r][c - 3] === 'S'; 
}
function lookUp(i: string[][], r: number, c: number): boolean { 
    return (r - 3 >= 0) && i[r][c] === 'X' && i[r - 1][c] === 'M' && i[r - 2][c] === 'A' && i[r - 3][c] === 'S'; 
}
function lookDown(i: string[][], r: number, c: number): boolean { 
    return (r + 3 < i.length) && i[r][c] === 'X' && i[r + 1][c] === 'M' && i[r + 2][c] === 'A' && i[r + 3][c] === 'S'; 
}
function lookUpRight(i: string[][], r: number, c: number): boolean { 
    return (c + 3 < i[r].length) && (r - 3 >= 0) && i[r][c] === 'X' && i[r - 1][c + 1] === 'M' && i[r - 2][c + 2] === 'A' && i[r - 3][c + 3] === 'S'; 
}
function lookUpLeft(i: string[][], r: number, c: number): boolean { 
    return (c - 3 >= 0) && (r - 3 >= 0) && i[r][c] === 'X' && i[r - 1][c - 1] === 'M' && i[r - 2][c - 2] === 'A' && i[r - 3][c - 3] === 'S'; 
}
function lookDownRight(i: string[][], r: number, c: number): boolean { 
    return (c + 3 < i[r].length) && (r + 3 < i.length) && i[r][c] === 'X' && i[r + 1][c + 1] === 'M' && i[r + 2][c + 2] === 'A' && i[r + 3][c + 3] === 'S'; 
}
function lookDownLeft(i: string[][], r: number, c: number): boolean { 
    return (c - 3 >= 0) && (r + 3 < i.length) && i[r][c] === 'X' && i[r + 1][c - 1] === 'M' && i[r + 2][c - 2] === 'A' && i[r + 3][c - 3] === 'S'; 
}

export function aoc_part1(): any {
    const i = readStringList('./assets/aoc04.txt').map(l => l.split(''));
    let count = 0;
    i.forEach((r, ri) => {
        r.forEach((c, ci) => {
            if (lookRight(i, ri, ci)) count++;
            if (lookLeft(i, ri, ci)) count++;
            if (lookUp(i, ri, ci)) count++;
            if (lookDown(i, ri, ci)) count++;
            if (lookUpRight(i, ri, ci)) count++;
            if (lookDownRight(i, ri, ci)) count++;
            if (lookUpLeft(i, ri, ci)) count++;
            if (lookDownLeft(i, ri, ci)) count++;
        });
    });

    return count;
}

export function aoc_part2(): any {
    const i = readStringList('./assets/aoc04.txt').map(l => l.split(''));
    let count = 0;

    i.forEach((r, ri) => {
        if (ri === 0 || ri + 1 === i.length) return;
        r.forEach((c, ci) => {
            if (ci === 0 || ci + 1 === i[ri].length) return;
            if (i[ri][ci] === 'A') {
                if (((i[ri - 1][ci - 1] === 'M' && i[ri + 1][ci + 1] === 'S') || (i[ri - 1][ci - 1] === 'S' && i[ri + 1][ci + 1] === 'M') ) &&
                    ((i[ri - 1][ci + 1] === 'M' && i[ri + 1][ci - 1] === 'S') || (i[ri - 1][ci + 1] === 'S' && i[ri + 1][ci - 1] === 'M'))) {
                    count++;
                }
            }
        });
    });

    return count;
}

