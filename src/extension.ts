import {commands, ExtensionContext} from 'vscode';
import { startSeqFind } from './seqFind';


export function activate(context: ExtensionContext) {

	// Extension successfully added
	console.log('Activating "vscode-seqfind"... :)');

	let disposable = commands.registerCommand('seqfind.search', () => {
		startSeqFind(context);
	});
	context.subscriptions.push(disposable);
}

// Deactivate extension
export function deactivate() {}
