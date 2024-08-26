import { directories } from "../directories";
import { Command, ICommand, TerminalDirectory } from "../types";

export const ChangeDirectoryCommand: ICommand = {
    execute: function (
        command: Command,
        commandHistory: Array<Command>,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string {
        const commandChunks: string[] = command.text.split(' ');

        const directoryToMoveTo = commandChunks[1];

        const newDirectoryKey: string | null = directoryToMoveTo === '../'
            ? currentDirectory.parent
            : directoryToMoveTo;

        if (newDirectoryKey === null) {
            return 'No parent directory!';
        }

        console.log(command.workingDirectory);

        const newDirectory = directories.get(command.workingDirectory + newDirectoryKey);

        if (newDirectory) {
            setCurrentDirectory(newDirectory);
            return '';
        } else {
            return 'No such file or directory: ' + directoryToMoveTo;
        }
    }
};
