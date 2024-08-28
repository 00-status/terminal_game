import { ICommand, Command, TerminalDirectory } from "../types";

export const ListCommand: ICommand = {
    execute(
        command: Command,
        commandHistory: Array<Command>,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string {        
        const subDirectories = currentDirectory.subDirectories.join("\n");
        return subDirectories;
    }
}