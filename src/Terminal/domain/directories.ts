import { TerminalDirectory, TerminalFile } from "./types";

export const startingDirectory: TerminalDirectory = {
    name: '/',
    dateCreated: '2237-01-01 00:00:00',
    parent: null,
    subDirectories: ['documents', 'emails'],
    files: new Map<string, TerminalFile>()
}

export const directories: Map<string, TerminalDirectory> = new Map([
    [
        '/',
        {
            name: '/',
            dateCreated: '2237-01-01 00:00:00',
            parent: null,
            subDirectories: ['documents', 'emails'],
            files: new Map<string, TerminalFile>()
        }
    ],
    [
        '/documents',
        {
            name: '/documents',
            dateCreated: '2237-01-12 00:00:00',
            parent: '/',
            subDirectories: [],
            files: new Map<string, TerminalFile>()
        }
    ],
    [
        '/emails',
        {
            name: '/documents',
            dateCreated: '2237-01-07 00:00:00',
            parent: '/',
            subDirectories: [],
            files: new Map<string, TerminalFile>()
        }
    ],
]);
