export interface SequenceDetect {

    decorateMatches(seq: string): void;
}

export class IdenticalDetect implements SequenceDetect {

    public decorateMatches(seq: string) {
        
    }
}