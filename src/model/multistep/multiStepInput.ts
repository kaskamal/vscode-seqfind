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

    public async showQuickPick({ title, step, totalSteps, items, activeItem, placeholder, buttons }: any) {
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
            input.onDidChangeSelection(items => {
                // if (items[0]) {
                //     updateItemLabel(item[0]);
                // }
                window.showInformationMessage(`Selected ${items[0].label.slice(9)}`);
            })
        );

        this.current = input;
        this.current.show();
    }
}