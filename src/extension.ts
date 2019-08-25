import {commands, ExtensionContext, window} from 'vscode';
import { multiStepInput, identicalSearch, complementSearch, reverseComplementSearch } from "./model/searchManager"; 


export function activate(context: ExtensionContext) {

	// Extension successfully added
	console.log('Activating "vscode-seqfind"... :)');

	let disposable = commands.registerCommand('seqfind.search', () => {

		// Options to select file type / style to complete search for
		const options: {name: string, func: (context: ExtensionContext) => Promise<void>}[] = [
			{
				name: "Multistep Input Search",
				func: multiStepInput,
			},
			{
				name: "Identical Search",
				func: identicalSearch
			},
			{
				name: "Complement Search",
				func: complementSearch
			},
			{
				name: "Reverse Complement Search",
				func: reverseComplementSearch
			}
		];

		// Pick items from list of items
		const quickPick = window.createQuickPick();
		quickPick.items = options.map(obj => ({ label: obj.name}));

		const editor = window.activeTextEditor;
		if (editor !== undefined) {
			quickPick.onDidChangeSelection(sel => {
				if (sel[0]) {
					const selection: {name: string, func: (context: ExtensionContext) => Promise<void>} = 
						options.filter(obj => obj.name === sel[0].label)[0];
					selection.func(context)
						.catch(console.error);
				}
			});
			quickPick.title = "Genome Search";
			quickPick.placeholder = "Please select";
			quickPick.onDidHide( () => quickPick.dispose());
			quickPick.show();
		}
	});
	context.subscriptions.push(disposable);
}

// Deactivate extension
export function deactivate() {}
