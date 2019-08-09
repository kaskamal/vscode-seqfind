import {QuickPickItem} from 'vscode';

export class SearchItem implements QuickPickItem {
    name: string;
    label: string;
    description: string;

    constructor(text: string, desc: string = '') {
        this.name  = text;
        this.label = text;
        this.description = desc;
    }
}