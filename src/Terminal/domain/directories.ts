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
                            contents: 'Date: 2337-06-04 00:00:00',
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
