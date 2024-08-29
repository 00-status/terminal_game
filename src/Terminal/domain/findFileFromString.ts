import { navigateDirectories } from "./navigateDirectories";
import { Command, TerminalDirectory } from "./types";

export const findFileFromString = (
    command: Command,
    setCommand: (command: Command) => void,
    currentDirectory: TerminalDirectory
): void => {
    const commandStringGroups = command.text.split(" ");

    if (commandStringGroups.length <= 1 || commandStringGroups[0] !== "open") {
        return;
    }

    const filePathGroups = commandStringGroups[1].split("/")
    const newFilePath = findDirectory(filePathGroups, currentDirectory);

    if (newFilePath) {
        setCommand({ ...command, text: commandStringGroups[0] + " " + newFilePath });
    }
};

const findDirectory = (filePathGroups: Array<string>, currentDirectory: TerminalDirectory): string | null => {
    if (filePathGroups.length > 1) {
        const fileName = filePathGroups.pop();
        const directory = navigateDirectories(filePathGroups, currentDirectory);

        const potentialFiles = [...directory.files.keys()];
        const filteredFiles = potentialFiles.filter((file: string) => fileName ? file.startsWith(fileName) : false);

        return filteredFiles.length > 0
            ? filePathGroups.join("/") + "/" + filteredFiles[0]
            : null;
    } else {
        const potentialFiles = [...currentDirectory.files.keys()];
        const filteredFiles = potentialFiles.filter((file: string) => file.startsWith(filePathGroups[0]));

        return filteredFiles.length > 0
            ? filteredFiles[0]
            : null;
    }
};


// TAB AUTO-COMPLETE
// find the proper directory (either the current dir or the dir at the end of the path)
// if the proper directory cannot be found
//      do nothing
// get the partial text string.
// get a list of all files in the dir.
// get all files that are a partial match for the string. Sort them alphabetically.
// return the first string in that list.
