import { TerminalDirectory, TerminalFile } from "./types";

export const startingDirectory: TerminalDirectory = {
    name: '',
    dateCreated: '2237-01-01 00:00:00',
    parent: null,
    subDirectories: ['documents', 'emails'],
    files: new Map<string, TerminalFile>()
}

export const directories: Map<string, TerminalDirectory> = new Map([
    [
        '/',
        {
            name: '',
            dateCreated: '2237-01-01 00:00:00',
            parent: null,
            subDirectories: ['documents', 'emails'],
            files: new Map<string, TerminalFile>()
        }
    ],
    [
        '/documents',
        {
            name: 'documents',
            dateCreated: '2237-01-12 00:00:00',
            parent: '/',
            subDirectories: [],
            files: new Map<string, TerminalFile>(
                [
                    [
                        'README.md',
                        {
                            name: 'README.md',
                            contents: 'Banana!',
                            creatorUsername: '00-status',
                            dateCreated: '2337-01-23 00:00:00',
                            dateModified: '2337-08-02 00:00:00'
                        }
                    ]
                ]
            )
        }
    ],
    [
        '/emails',
        {
            name: 'emails',
            dateCreated: '2237-01-07 00:00:00',
            parent: '/',
            subDirectories: ['john'],
            files: new Map<string, TerminalFile>(
                [
                    [
                        'little_italy.txt',
                        {
                            name: 'little_italy.txt',
                            contents: 'Date: 2337-06-04 00:00:00\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\nGood luck,\n\n\nBarry',
                            creatorUsername: '00-status',
                            dateCreated: '2337-06-04 00:00:00',
                            dateModified: '2337-06-04 00:00:00'
                        }
                    ]
                ]
            )
        }
    ],
    [
        '/emails/john',
        {
            name: 'john',
            dateCreated: '2237-01-07 00:00:00',
            parent: '/emails',
            subDirectories: [],
            files: new Map<string, TerminalFile>()
        }
    ],
]);
