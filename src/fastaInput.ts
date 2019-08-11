import { QuickPickItem, ExtensionContext, Uri } from 'vscode';
import { MultiStepButton } from "./model/multistep/multiStepButton";
import { State, MultiStepInput } from "./model/multistep/MultiStepInput";


// Multi-step input for selecting options to search query
export async function multiStepInput(context: ExtensionContext) {

    // First input items
    const resourceGroups: QuickPickItem[] = ['identical', "complement", "reverseComplement"]
        .map(label => ({ 
            label,
            selected: false 
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