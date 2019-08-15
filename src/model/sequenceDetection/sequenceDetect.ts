import { window, TextEditorDecorationType, OverviewRulerLane, DecorationOptions, Range } from 'vscode'
import { convertComplement, convertReverseComplement } from '../../util';

export abstract class SequenceDetect {

    abstract decorateMatches(seq: string): void;

    createDecorationType(id: string): TextEditorDecorationType {
        const decorationType: TextEditorDecorationType = window.createTextEditorDecorationType({
            borderWidth: '3px',
            borderStyle: 'solid',
            borderColor: { id },
            overviewRulerColor: { id },
            overviewRulerLane: OverviewRulerLane.Right
        });
        return decorationType
    }

    drawDecorations(querySeq: string, decorationType: TextEditorDecorationType) {
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
		activeEditor.setDecorations(decorationType, decorationList);
    }
}

export class IdenticalDetect extends SequenceDetect {

    public decorateMatches(seq: string): void {
        const identicalDecorationType = this.createDecorationType('seqfind.identicalBorder'); 
        this.drawDecorations(seq, identicalDecorationType);
    }   
}


export class ComplementDetect extends SequenceDetect {

    public decorateMatches(seq: string): void {
        const identicalDecorationType = this.createDecorationType('seqfind.complementBorder'); 
        this.drawDecorations(convertComplement(seq), identicalDecorationType);
    }
}

export class ReverseComplementDetect extends SequenceDetect {

    public decorateMatches(seq: string): void {
        const identicalDecorationType = this.createDecorationType('seqfind.reverseComplementBorder'); 
        this.drawDecorations(convertReverseComplement(seq), identicalDecorationType);
    }
}