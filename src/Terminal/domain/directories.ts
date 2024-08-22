import { TerminalDirectory, TerminalFile } from "./types";

export const startingDirectory: TerminalDirectory = {
    name: 'documents',
    dateCreated: '2024-01-01 00:00:00',
    parent: null,
    subDirectories: [],
    files: new Map<string, TerminalFile>()
};
