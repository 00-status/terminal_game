import { ICommand, Command, TerminalDirectory } from "../types";

export const ListCommand: ICommand = {
    execute(
        command: Command,
        commandHistory: Array<Command>,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string {
        return commandHistory.map(command => command.text).join("\n");
    }
}