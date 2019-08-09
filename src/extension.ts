import * as vscode from 'vscode';
import { SearchItem } from './model/searchItem';
import * as Util from './Util';
import { multiStepInput } from "./fastaInput"; 

export function activate(context: vscode.ExtensionContext) {

	// Extension successfully added
	console.log('Activating "vscode-seqfind"... :)');

	let disposable = vscode.commands.registerCommand('seqfind.search', () => {

		// Options to select file type / style to complete search for
		const options: { [key: string]: (context: vscode.ExtensionContext) => Promise<void> } = {
			multiStepInput
		};

		// Pick items from list of items
		const quickPick = vscode.window.createQuickPick();
		quickPick.items = Object.keys(options).map(label => ({ label }));

		const editor = vscode.window.activeTextEditor;
		if (editor !== undefined) {
			quickPick.onDidChangeSelection(sel => {
				if (sel[0]) {
					options[sel[0].label](context)
						.catch(console.error);
				}
			});
			quickPick.title = "Genome Search";
			quickPick.placeholder = "Please select ";
			quickPick.onDidHide( () => quickPick.dispose());
			quickPick.show();
		}
	});
	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
