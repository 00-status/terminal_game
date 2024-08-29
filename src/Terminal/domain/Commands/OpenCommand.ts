import { navigateDirectories } from "../navigateDirectories";
import { ICommand, Command, TerminalDirectory, TerminalFile } from "../types";

export const OpenCommand: ICommand = {
    execute(
        command: Command,
        commandHistory: Array<Command>,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string {
        const splitCommandText = command.text.split(" ");

        const filePathGroups = splitCommandText[1].split("/");

        var file: TerminalFile | null = null;
        if (filePathGroups.length > 1) {
            const fileName = filePathGroups.pop();
            const directory = navigateDirectories(filePathGroups, currentDirectory);

            file = directory.files.get(fileName ?? '') ?? null;
        } else {
            file = currentDirectory.files.get(filePathGroups[0]) ?? null;
        }

        if (file) {
            return file.contents;
        } else {
            return 'No such file exists!';
        }
    }
}