import SelectUtils from "main";
import {App, Editor, EditorPosition, MarkdownView, Modal, Notice, Plugin} from 'obsidian';


export function addCommands(this:SelectUtils){
        // This adds a simple command that can be triggered anywhere
        this.addCommand({
            id: 'open-modal-simple',
            name: 'Open modal (simple)',
            callback: () => {
                new SampleModal(this.app).open();
            }
        });
        // TODO: Document commands
        this.addCommand({
            id: 'paragraph-select-next',
            name: 'Select Next Paragraph',
            icon:'arrow-down-wide-narrow',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                let start = editor.getCursor("anchor");
                let end:EditorPosition = editor.getCursor("head")
                const max = editor.lineCount();
                // Skip empty lines
                while(!editor.getLine(end.line).trim()){
                    end.line++;
                    if(end.line == max)
                        return; //Failed to find a next paragraph
                }
                // TODO: Finish command
                for(; end.line<max; end.line++){
                    if(!editor.getLine(end.line).trim()){
                        break;
                    }
                }
                editor.setSelection(start, end);
            }
        });

        this.addCommand({
            id: 'reverse-select',
            name: 'Reverse Current Selection',
            icon: 'arrow-up-down',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                editor.setSelection(editor.getCursor("head"), editor.getCursor("anchor"));
            }
        });

        this.addCommand({
            id: 'select-section',
            name: 'Select Heading Section',
            icon: '',
            editorCallback: (editor: Editor, view: MarkdownView) => {
                new Notice("Not Implemented");
            }
        });
        // This adds a complex command that can check whether the current state of the app allows execution of the command
        this.addCommand({
            id: 'open-modal-complex',
            name: 'Open modal (complex)',
            checkCallback: (checking: boolean) => {
                // Conditions to check
                const markdownView = this.app.workspace.getActiveViewOfType(MarkdownView);
                if (markdownView) {
                    // If checking is true, we're simply "checking" if the command can be run.
                    // If checking is false, then we want to actually perform the operation.
                    if (!checking) {
                        new SampleModal(this.app).open();
                    }

                    // This command will only show up in Command Palette when the check function returns true
                    return true;
                }
                return false;
            }
        });
}

export class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		let {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}