import * as vscode from 'vscode';
import { SearchItem } from './SearchItem';

export function activate(context: vscode.ExtensionContext) {

	// Extension successfully added
	console.log('Activating "vscode-seqfind"... :)');

	let disposable = vscode.commands.registerCommand('seqfind.search', () => {

		// Pick items from list of items
		let input = vscode.window.createQuickPick<SearchItem>();

		input.title = "Genome Search";
		input.placeholder = "Starting typing to search";

		input.onDidHide( () => input.dispose());
		input.show();

	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
