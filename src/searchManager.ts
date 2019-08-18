import { QuickPickItem, ExtensionContext, Uri, window, IndentAction, InputBoxOptions, InputBox } from 'vscode';
import { MultiStepButton } from "./model/multistep/multiStepButton";
import { State, MultiStepInput } from "./model/multistep/MultiStepInput";
import { isValidSequence, validateInput } from "./util"
import { IdenticalDetect, SequenceDetect, ComplementDetect, ReverseComplementDetect } from "./model/sequenceDetection/sequenceDetect";


// Multi-step input for selecting options to search query
export async function multiStepInput(context: ExtensionContext) {

    // First input items
    const resourceGroups: QuickPickItem[] = ['Identical', "Complement", "Reverse Complement"]
        .map(label => ({ 
            label: `$(beaker) ${label}`
        }));

    // Button 
    const ResourceButton = new MultiStepButton({
        dark: Uri.file(context.asAbsolutePath('resources/dark/add.svg')),
        light: Uri.file(context.asAbsolutePath('resources/light/add.svg'))
    }, 'Select Matching Sequences');
    
    async function selectResourceGroup(input: MultiStepInput, state: Partial<State>) {
        const pick = await input.showQuickPick({
            title: 'Search Genomic Sequences',
            step: 1,
            totalSteps: 2,
            placeholder: 'Pick sequence groups',
            items: resourceGroups,
            buttons: [ResourceButton]
        });
    }

    const state = {} as Partial<State>;
    selectResourceGroup(new MultiStepInput, state);
}

export async function identicalSearch(context: ExtensionContext) {
    const inputBox = createSearchInputBox(context);
    showSearchInputBox(inputBox, "identical");
}

export async function complementSearch(context: ExtensionContext) {
    const inputBox = createSearchInputBox(context);
    showSearchInputBox(inputBox, "complement");
}

export async function reverseComplement(context: ExtensionContext) {
    const inputBox = createSearchInputBox(context);
    showSearchInputBox(inputBox, "reverseComplement");
}

const sequenceTypes: {[key: string]: any} = {
    "identical": IdenticalDetect,
    "complement": ComplementDetect,
    "reverseComplement": ReverseComplementDetect
};


// Display input box
function showSearchInputBox(inputBox: InputBox, type: string) {
    inputBox.placeholder = "Input sequence to search for...";
    inputBox.show();
    inputBox.onDidAccept(() => {
        if (isValidSequence(inputBox.value.trim())) {
            findMatchingSequences(inputBox.value.trim(), type);
        }
    });
}

// Generic input box for simple searches (identical, complement, & reverse complement)
function createSearchInputBox(context: ExtensionContext): InputBox {
    const inputBox = window.createInputBox();
    inputBox.buttons = [
        {
            iconPath: Uri.file(context.asAbsolutePath('resources/dark/arrow-up.svg')),
            tooltip: "Hide search bar"
        }
    ]
    inputBox.title = "Genome Search";
    inputBox.ignoreFocusOut = true;
    inputBox.value = '';
    inputBox.onDidChangeValue(e => {
        inputBox.validationMessage = validateInput(e);
    })
    return inputBox;
}


function findMatchingSequences(seq: string | undefined, type: string) {
    const sequenceDetect: SequenceDetect = new sequenceTypes[type]();
    if (typeof seq == 'string') {
        sequenceDetect.decorateMatches(seq);    
    }
}