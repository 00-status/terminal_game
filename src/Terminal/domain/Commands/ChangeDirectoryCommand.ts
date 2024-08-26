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

        const directoryToMoveTo: string = commandChunks[1] ?? '';
        const newDirectoryKey: string = findDirectoryKey(directoryToMoveTo, currentDirectory);

        const newDirectory = directories.get(newDirectoryKey);

        if (newDirectory) {
            setCurrentDirectory(newDirectory);
            return '';
        } else {
            return 'No such file or directory: ' + directoryToMoveTo;
        }
    }
};

const findDirectoryKey = (directoryToMoveTo: string, currentDirectory: TerminalDirectory): string => {
    if (directoryToMoveTo.match('../')) {
        return currentDirectory.parent ?? '';
        // pwd = /emails/john/
        // cd ../../documents
        // cd {../../}documents
        // cd /documents
        // Getting the parent's parent.
        // For each "../"
        //      grab the FQDN of the parent directory
        //      If the parent's FQDN is null
        //          This is the root node. Exit loop

    } else if (directoryToMoveTo.match('./')) {
        return directoryToMoveTo.replace('./', currentDirectory.name)
    }

    throw new Error('Command argument must begin with either ../ or ./');
};
