import { window, TextEditorDecorationType, OverviewRulerLane, DecorationOptions, Range, Disposable } from 'vscode';
import { convertComplement, convertReverseComplement } from '../../util';

export abstract class SequenceDetect {

    abstract decorationType: TextEditorDecorationType;
    abstract convertSequence(seq: string): string;

    protected decorationStyle: {borderWidth: string, borderStyle: string, overviewRulerLane: OverviewRulerLane} = {
        borderWidth: '3px',
        borderStyle: 'solid',
        overviewRulerLane: OverviewRulerLane.Right
    };

    drawDecorations(querySeq: string) {
        const activeEditor = window.activeTextEditor;

        if (!activeEditor) {
            return;
        }
        const regEx = new RegExp(querySeq, "ig");
		const text = activeEditor.document.getText();
		const decorationList: DecorationOptions[] = [];
		let match;
		while (match = regEx.exec(text)) {
			const startPos = activeEditor.document.positionAt(match.index);
			const endPos = activeEditor.document.positionAt(match.index + match[0].length);
			const decoration = { range: new Range(startPos, endPos), hoverMessage: 'Match' };
			decorationList.push(decoration);
        }
		activeEditor.setDecorations(this.decorationType, decorationList);
    }

    public decorateMatches(seq: string): void {
        this.drawDecorations(this.convertSequence(seq));
    }

    dispose() {
        this.decorationType.dispose();
    }
}

export class IdenticalDetect extends SequenceDetect {

    private id: string = 'seqfind.identicalBorder';
    decorationType = window.createTextEditorDecorationType({
        borderColor: { id: this.id },
        overviewRulerColor: { id: this.id },
        ... this.decorationStyle,
    });

    convertSequence(seq: string): string { return seq };
}


export class ComplementDetect extends SequenceDetect {

    private id: string = 'seqfind.complementBorder';
    decorationType = window.createTextEditorDecorationType({
        borderColor: { id: this.id },
        overviewRulerColor: { id: this.id },
        ... this.decorationStyle,
    });

    convertSequence(seq: string): string { 
        return convertComplement(seq) 
    };
}

export class ReverseComplementDetect extends SequenceDetect {

    private id: string = 'seqfind.reverseComplementBorder';
    decorationType = window.createTextEditorDecorationType({
        borderColor: { id: this.id },
        overviewRulerColor: { id: this.id },
        ... this.decorationStyle,
    });

    convertSequence(seq: string): string { return convertReverseComplement(seq) };
}