import { directories, startingDirectory } from "../directories";
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

        const newDirectory = navigateDirectories(directoryToMoveTo, currentDirectory);
        setCurrentDirectory(newDirectory);

        return '';
    }
};

// TODO: Surface errors related to unknown directories
const navigateDirectories = (directoryString: string, currentDirectory: TerminalDirectory): TerminalDirectory => {
    const directoryGroups = directoryString.split('/');

    var carry: TerminalDirectory = currentDirectory;
    directoryGroups.forEach((group: string) => {
        switch (group) {
            case '.':
                // Current directory, no change
                break;
            case '..':
                const newDirectory = moveUpDirectory(carry);
                if (newDirectory) {
                    carry = newDirectory;
                }
                break;
            case '':
                carry = startingDirectory;
                break;
            default:
                const newSubDirectory = moveDownDirectory(carry, group);
                if (newSubDirectory) {
                    carry = newSubDirectory;
                }
                break;
        }
    });

    return carry;
};

const moveUpDirectory = (currentDirectory: TerminalDirectory): TerminalDirectory | null => {
    const parentDirectory = directories.get(currentDirectory.parent ?? '');
    return parentDirectory ?? null;
};

const moveDownDirectory = (currentDirectory: TerminalDirectory, desiredDirectory: string): TerminalDirectory | null => {
    const formattedDirectory = (currentDirectory.parent ?? '') + currentDirectory.name + '/' + desiredDirectory;
    const newDirectory = directories.get(formattedDirectory);

    return newDirectory ?? null;
};
