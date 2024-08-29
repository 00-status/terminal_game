import { ICommand, Command, TerminalDirectory } from "../types";

export const ListCommand: ICommand = {
    execute(
        command: Command,
        commandHistory: Array<Command>,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string {        
        const subDirectories = [...currentDirectory.subDirectories].map(directory => '{dir}\t' + directory);
        const files = [...currentDirectory.files.keys()].map(file => '{file}\t' + file);

        return [...subDirectories, ...files].join("\n");
    }
}