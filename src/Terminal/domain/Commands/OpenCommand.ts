import { ICommand, Command, TerminalDirectory } from "../types";

export const OpenCommand: ICommand = {
    execute(
        command: Command,
        commandHistory: Array<Command>,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string {
        const splitCommandText = command.text.split(" ");

        const file = currentDirectory.files.get(splitCommandText[1]);

        // pwd = documents
        //SCENARIO 1
        // open ../emails/little_italy.txt
        // open {path}{fileName}
        // SCENARIO 2
        // open little_italy.txt
        // open {fileName}
        // SCENARIO 3
        // open /file_3.txt
        // open {path}{fileName}

        // split filePath on "/" marks.
        // If the length is greater than 1
        //      find the correct directory.
        // else
        //      use the current directory
        // get the file from the found directory

        if (file) {
            return file.contents;
        } else {
            return 'No such file exists!';
        }
    }
}