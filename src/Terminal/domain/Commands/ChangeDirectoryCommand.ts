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

// ./john
// ../
// ../documents

// If we could find the next directory in chunks, that would be ideal
// PWD = /emails
// ./john/../../documents
// {./}{john/}{../}{../}{documents}
// Using Split: {.}{john}{..}{..}{documents}
//
// Alogrithm:
//      Determine Starting Directory (root, current, or parent)
//      split the string into segments, separating on the next forward-slash
//      For each segment
//          Move the startingDirectory up or down, based on the punctuation 
//          moveUpDirectory(currentDirectory): TerminalDirectory;
//          moveDownDirectory(currentDirectory, desiredDirectory): TerminalDirectory;
//          moveToRoot(): TerminalDirectory;
//      If the directory cannot be found, throw an error.


const navigateDirectories = (directoryString: string, currentDirectory: TerminalDirectory) => {
    const directoryGroups = directoryString.split('/');

    var carry = currentDirectory;
    directoryGroups.forEach((group: string) => {
        switch (group) {
            case '.':
                // Current directory, no change
                break;
            case '..':
                // Move up a directory
                break;
            case '':
                // Root Directory
                break;
            default:
                // The name of a directory, index into it.
                break;
        }
    });
};

const moveUpDirectory = (): TerminalDirectory => {
    return {} as TerminalDirectory;
};

const moveDownDirectory = (): TerminalDirectory => {
    return {} as TerminalDirectory;
};

const findDirectoryKey = (directoryToMoveTo: string, currentDirectory: TerminalDirectory): string => {
    if (directoryToMoveTo.match('../')) {
        const loopCount = directoryToMoveTo.match(/\.\.\//gm);

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
