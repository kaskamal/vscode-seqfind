import { QuickInputButton, Uri } from 'vscode';

interface IconPath {
    light: Uri;
    dark: Uri;
}

export class MultiStepButton implements QuickInputButton {
    
    constructor (public iconPath: IconPath, public toolTip: string) { }

}