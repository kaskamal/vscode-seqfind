import { QuickPickItem, ExtensionContext, Uri, window, InputBox, Disposable, workspace } from 'vscode';
import { MultiStepButton } from "./multistep/MultiStepButton";
import { State, MultiStepInput } from "./multistep/MultiStepInput";
import { SequenceInputBox, IdenticalInputBox, ComplementInputBox, ReverseComplementInputBox } from "./inputBox/sequenceInputBox";

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
    const identicalInputBox: SequenceInputBox = new IdenticalInputBox(context);
    identicalInputBox.show();
}

export async function complementSearch(context: ExtensionContext) {
    const complementInputBox: SequenceInputBox = new ComplementInputBox(context);
    complementInputBox.show();
}

export async function reverseComplementSearch(context: ExtensionContext) {
    const reverseComplementInputBox: SequenceInputBox = new ReverseComplementInputBox(context);
    reverseComplementInputBox.show();
}


