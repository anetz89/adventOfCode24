import  { readStringList } from './importer.ts';

function solve(numbers: number[], operators: string[]): number[] {
    function getSolutions(index: number, current: number): void {
        if (index >= numbers.length) {
            results.push(current);
            return;
        }
        for (const op of operators) {
            switch(op) {
                case '+': getSolutions(index + 1, current + numbers[index]); break;
                case '*': getSolutions(index + 1, current * numbers[index]); break;
                case '||': getSolutions(index + 1, parseInt('' + current + numbers[index], 10)); break;
            }
        }
    }

    const results: number[] = [];
    getSolutions(1, numbers[0]); // Start the recursion
    return results;
}

export function aoc_part1(): any {
    return readStringList('./assets/aoc07.txt')
        .map(l => {
            let tmp = l.split(': ');
            return [parseInt(tmp[0], 10), tmp[1].split(' ').map(e => parseInt(e, 10))];
            }).
        filter(e => solve(e[1], ['+', '*']).includes(e[0]))
        .map(e => e[0])
        .reduce((a, b) => a + b);
}

export function aoc_part2(): any {
    return readStringList('./assets/aoc07.txt')
        .map(l => {
            let tmp = l.split(': ');
            return [parseInt(tmp[0], 10), tmp[1].split(' ').map(e => parseInt(e, 10))];
        })
        .filter(e => solve(e[1], ['+', '*', '||']).includes(e[0]))
        .map(e => e[0])
        .reduce((a, b) => a + b);
}

