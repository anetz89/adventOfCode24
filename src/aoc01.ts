import  { readStringList } from './importer.ts';

function parseLists(): string[][] {
    let list2: string[] = [];
    let list1 = (readStringList('./assets/aoc01.txt') as string[]).map((line) => {
        const lineVals = line.split('   ');
        list2.push(lineVals[1]);
        return lineVals[0];
    });

    return [list1, list2];
}

export function aoc_part1(): number { 
    const lists = parseLists().map(l => l.map(v => parseInt(v, 10)).sort());

    return lists[1].map((val, idx) => Math.abs(val - lists[0][idx]))
                    .reduce((a, b) => a + b);
}

export function aoc_part2(): number { 
    const lists = parseLists();

    return lists[0].map((val) => parseInt(val, 10) * lists[1].filter(v => v === val).length)
                    .reduce((a, b) => a + b);
}
