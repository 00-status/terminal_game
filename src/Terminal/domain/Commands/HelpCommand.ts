import { ICommand, Command, TerminalDirectory } from "../types";

export const HelpCommand: ICommand = {
    execute(
        command: Command,
        commandHistory: Array<Command>,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string {
        return 'Help! Help!';
    }
}
