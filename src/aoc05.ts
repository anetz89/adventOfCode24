import  { readStringList} from './importer.ts';

let rules: Map<number, number[]>;
let input: number[][];

function parseInput() {
    let isRule = true;

    rules = new Map();
    input = [];

    readStringList('./assets/aoc05.txt').forEach((l) => {
        if (l === '') {
            isRule = false;
            return;
        }
        if (isRule) {
            let rule = l.split('|').map(e => parseInt(e, 10));
            if (!rules.has(rule[0])) {
                rules.set(rule[0], []);
            }
            rules.get(rule[0])!.push(rule[1]);
        } else {
            input.push(l.split(',').map(e => parseInt(e, 10)));
        }
    });
}

function validateUpdates(values: number[], fix: boolean): boolean|number[] {
    for(let i = 0; i < values.length; i++) {
        if (rules.has(values[i])) {
            let ruleSet = rules.get(values[i]);
        
            // look forward
            let j = i + 1;
            while (j < values.length) {  
                if (!ruleSet!.includes(values[j])) {
                    if (!fix) return false;
                    
                    // move element in front of current value
                    const [element] = values.splice(j, 1);
                    values.splice(i - 1, 0, element);
                }
                j += 1;
            }

            // look backward
            let k = i - 1;
            while (k >= 0) {  
                if (ruleSet!.includes(values[k])) {
                    if (!fix) return false;

                    // move element behind current value
                    const [element] = values.splice(k, 1);
                    values.splice(i, 0, element);
                }
                k -= 1;
            }
        }
    }
    return fix? validateUpdates(values, false)? values: validateUpdates(values, true): true;
}

export function aoc_part1(): any {
    parseInput();

    return input.filter(values => validateUpdates(values, false))
        .map(v => v[(v.length - 1) / 2])
        .reduce((a, b) => a + b);
}

export function aoc_part2(): any {
    parseInput();

    return input.filter(values => !validateUpdates(values, false))
        .map(values => validateUpdates(values, true))
        .map(v => v[(v.length - 1) / 2])
        .reduce((a, b) => a + b);
}

