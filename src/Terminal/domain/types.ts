import { HelpCommand } from "./Commands/HelpCommand";
import { ListCommand } from "./Commands/ListCommand";

export type TerminalDirectory = {
    name: string;
    dateCreated: string; // 2024-01-01 00:00:00
    parent: TerminalDirectory | null;
    subDirectories: Array<TerminalDirectory>;
    files: Map<string, TerminalFile>;
}

export type TerminalFile = {
    name: string;
    contents: string;
    creatorUsername: string;
    dateCreated: string;
    dateModified: string;
};

export type Command = {
    id: string;
    text: string;
    workingDirectory: string;
};

export interface ICommand {
    execute(
        command: Command,
        commandHistory: Array<Command>,
        currentDirectory: TerminalDirectory,
        setCurrentDirectory: (directory: TerminalDirectory) => void,
        args: Array<string>
    ): string;
};

export const validCommands = new Map<string, ICommand>([
    ["help", HelpCommand],
    ["list", ListCommand]
])