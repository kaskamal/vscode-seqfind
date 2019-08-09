import { QuickInputButton, Uri } from 'vscode';

interface IiconPath {
    light: Uri;
    dark: Uri;
}

export class MultiStepButton implements QuickInputButton {
    
    constructor (public iconPath: IiconPath, public toolTip: string) { }

}