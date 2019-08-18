const NUCLEOTIDES = ["C", "G", "A", "T"];
enum COMPLEMENT  { C = "G", A = "T", G = "C", T = "A" };

// Determines whether input sequence is valid
export function isValidSequence(seq: string): boolean {
    const incorrectNucs = extractIncorrectNucs(seq);
    return incorrectNucs.length == 0;
}


// Validates sequence input
// Used by InputBox.validationMessage
export function validateInput(seq: string): string | undefined {
    const incorrectNucs = extractIncorrectNucs(seq);
    if (incorrectNucs.length == 0) {
        return undefined;
    } else {
        return `Invalid Nucleotide${incorrectNucs.length > 1 ? 's' : ''} ${incorrectNucs.join(" ")}`;
    }
}

// Extract all incorrect nucleotides present in seq
function extractIncorrectNucs(seq: string):  Array<string> {
    let incorrectNucs: Array<string> = [];
    seq.split('').forEach(elm => {
        if (!(NUCLEOTIDES.includes(elm.toUpperCase()) || NUCLEOTIDES.includes(elm.toLowerCase()))) {
            incorrectNucs.push(elm);
        }
    })
    return incorrectNucs;
}


export function convertComplement(seq: string): string {
    const sequenceArray = [...seq];
    return extractComplement(sequenceArray);
}

export function convertReverseComplement(seq: string): string {
    const sequenceArray = [...seq].reverse();
    return extractComplement(sequenceArray);
}

function extractComplement(sequenceArray: string[]): string {
    if (!sequenceValid(sequenceArray)) {
        throw Error("Sequence Invalid");
    }
    return sequenceArray.map(nuc => {
        return COMPLEMENT[nuc];
    }).join('');
}

function sequenceValid(codons: string[]): codons is Array<keyof typeof COMPLEMENT> {
    return codons.every(isValidCodon);
}

function isValidCodon(codon: string): codon is keyof typeof COMPLEMENT {
    return codon in COMPLEMENT;
}

