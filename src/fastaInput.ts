import { QuickPickItem, ExtensionContext, Uri, window } from 'vscode';
import { MultiStepButton } from "./model/multistep/multiStepButton";
import { State, MultiStepInput } from "./model/multistep/MultiStepInput";
import { isValidSequence } from "./Util"
import { IdenticalDetect. SequenceDetect } from "./model/sequenceDetection/sequenceDetect";


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

export async function identicalSearch() {
    const sequence: string | undefined = await window.showInputBox({
        value: '',
        placeHolder: 'Input sequence to search for...',
        validateInput: isValidSequence
    });
    findMatchingSequences(sequence);
}

export async function complementSearch() {
    const sequence: string | undefined = await window.showInputBox({
        value: '',
        placeHolder: 'Input sequence to search for complements',
        validateInput: isValidSequence
    });
    findMatchingSequences(sequence);
}

export async function reverseComplement() {
    const sequence: string | undefined = await window.showInputBox({
        value: '',
        placeHolder: 'Input sequence to search for complements',
        validateInput: isValidSequence
    });
    findMatchingSequences(sequence);
}

function findMatchingSequences(seq: string | undefined) {
    const sequenceDetect: SequenceDetect = new IdenticalDetect();
    if (typeof seq == 'string') {
        sequenceDetect.decorateMatches(seq);    
    }
}