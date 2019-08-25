import { ExtensionContext, InputBox, window, Uri, TextEditorDecorationType, Disposable, workspace } from "vscode";
import { isValidSequence, validateInput } from "../../util";
import { IdenticalDetect, ComplementDetect, ReverseComplementDetect, SequenceDetect } from "../sequenceDetection/sequenceDetect";

export abstract class SequenceInputBox {

    abstract sequenceDetection: SequenceDetect;
    private inputBox: InputBox;
    abstract placeholder: string;

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
        this.inputBox.placeholder = this.placeholder;
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
    placeholder: string;

    constructor(context: ExtensionContext) {
        super(context);
        this.placeholder = "Input sequence to search for ...";
    }
}

export class ComplementInputBox extends SequenceInputBox {

    sequenceDetection = new ComplementDetect();
    placeholder: string;


    constructor(context: ExtensionContext) {
        super(context);
        this.placeholder = "Input sequence to search for complement ..."
    }
}

export class ReverseComplementInputBox extends SequenceInputBox {

    sequenceDetection = new ReverseComplementDetect();
    placeholder: string;

    constructor(context: ExtensionContext) {
        super(context);
        this.placeholder = "Input sequence to search for reverse complement ..."
    }
}