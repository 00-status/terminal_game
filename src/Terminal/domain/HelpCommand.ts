import { ICommand, TerminalDirectory } from "./types";

export const HelpCommand: ICommand = {
    execute(
        id: string,
        text: string,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string {
        return 'Help! Help!';
    }

}
