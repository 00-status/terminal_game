export type TerminalDirectory = {
        name: string;
        dateCreated: string; // 2024-01-01 00:00:00
        parent: TerminalDirectory;
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