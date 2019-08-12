const NUCLEOTIDES = ["C", "G", "A", "T"];

const FastaExtenstion = [
     "fasta",
     "fa"
 ];


// Determine whether file extension is valid
export function isFastaFile(filename: string): boolean {
    const ext = filename.split('.').pop();
    if (ext === undefined) {
        return false;
    }
    return FastaExtenstion.includes(ext);
}

// Determines whether input sequence is valid
export function isValidSequence(seq: string): string | undefined {
    let incorrectNucs: Array<string> = [];
    seq.split('').forEach(elm => {
        if (!NUCLEOTIDES.includes(elm)) {
            incorrectNucs.push(elm);
        }
    })
    if (incorrectNucs.length == 0) {
        return undefined;
    } else {
        return `Invalid Nucleotide${incorrectNucs.length > 1 ? 's' : ''} ${incorrectNucs.join(" ")}`;
    }
}