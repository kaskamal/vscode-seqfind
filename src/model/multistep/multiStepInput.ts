import { QuickPickItem, window, Disposable, QuickInput } from 'vscode';

export interface State {
    title: string;
    step: number;
    totalSteps: number;
    resourceGroup: QuickPickItem | string;
    name: string;
}

export class MultiStepInput {

    private current?: QuickInput;


    
    async showQuickPick({ title, step, totalSteps, items, activeItem, placeholder, buttons }: any) {
        let disposables: Disposable[] = [];

        const input = window.createQuickPick();
        input.title = title;
        input.step = step;
        input.totalSteps = totalSteps;
        input.placeholder = placeholder;
        input.items = items;
        if (activeItem) {
            input.activeItems = [activeItem];
        }
        input.buttons = [
            ...(buttons || [])
        ];
        
        disposables.push(
            input.onDidTriggerButton(item => {
                window.showInformationMessage(`Triggered ${item}`);
            }),
            input.onDidChangeSelection(items => window.showInformationMessage(`Triggered ${items[0].label}`)),
        );

        this.current = input;
        this.current.show();
    }
}