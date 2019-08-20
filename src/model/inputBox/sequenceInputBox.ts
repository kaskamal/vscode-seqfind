import { ExtensionContext, InputBox, window, Uri, TextEditorDecorationType, Disposable, workspace } from "vscode";
import { isValidSequence, validateInput } from "../../util";
import { IdenticalDetect, ComplementDetect, ReverseComplementDetect, SequenceDetect } from "../sequenceDetection/sequenceDetect";

export abstract class SequenceInputBox {

    abstract sequenceDetection: SequenceDetect;
    private inputBox: InputBox;

    static sequenceTypes: {[key: string]: any} = {
        "identical": IdenticalDetect,
        "complement": ComplementDetect,
        "reverseComplement": ReverseComplementDetect
    };



    constructor(private context: ExtensionContext) {
        this.inputBox = this.createSearchInputBox();
    };

    private createSearchInputBox(): InputBox {
        const inputBox = window.createInputBox();
        inputBox.title = "Genome Search";
        inputBox.ignoreFocusOut = true;
        inputBox.value = '';
        inputBox.onDidChangeValue(e => {
            inputBox.validationMessage = validateInput(e);
        });
        return inputBox;
    }

    public show() {
        this.inputBox.placeholder = "Input sequence to search for...";
        this.inputBox.show();
        let disposables: Disposable[] = []
        this.inputBox.onDidAccept(() => {
            const valueTrim = this.inputBox.value.trim();
            if (isValidSequence(valueTrim)) {
                disposables.push(
                    workspace.onDidChangeTextDocument(event => {
                    this.findMatchingSequences(valueTrim);
                    }),
                    window.onDidChangeActiveTextEditor(editor => {
                        if (editor) {
                            this.findMatchingSequences(valueTrim);
                        }
                    })
                );
                this.findMatchingSequences(valueTrim);
            }
        });
        this.inputBox.onDidHide(() => { 
            disposables.forEach((dis) => { dis.dispose() });
            this.sequenceDetection.dispose();
        });
    }


    findMatchingSequences(seq: string | undefined) {
        if (typeof seq == 'string') {
            this.sequenceDetection.decorateMatches(seq);    
        }
    }

}


export class IdenticalInputBox extends SequenceInputBox {

    sequenceDetection = new IdenticalDetect();

    constructor(context: ExtensionContext) {
        super(context);
    }
}

export class ComplementInputBox extends SequenceInputBox {

    sequenceDetection = new ComplementDetect();

    constructor(context: ExtensionContext) {
        super(context);
    }
}

export class ReverseComplementInputBox extends SequenceInputBox {

    sequenceDetection = new ReverseComplementDetect();

    constructor(context: ExtensionContext) {
        super(context);
    }
}