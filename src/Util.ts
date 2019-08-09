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