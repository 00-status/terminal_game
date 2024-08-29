import { ICommand, Command, TerminalDirectory } from "../types";

export const OpenCommand: ICommand = {
    execute(
        command: Command,
        commandHistory: Array<Command>,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string {
        const splitCommandText = command.text.split(" ");

        const file = currentDirectory.files.get(splitCommandText[1]);

        if (file) {
            return file.contents;
        } else {
            return 'No such file exists!';
        }
    }
}