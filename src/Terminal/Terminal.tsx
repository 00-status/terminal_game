import { useState } from "react";

import './terminal.css';
import { Command, ICommand, TerminalDirectory, validCommands } from "./domain/types";
import { startingDirectory } from "./domain/directories";

// Have an input directly below a div.
// as commands are executed, the appear in the div.
// When the div reaches max-height, the overflow is hidden.
// Ensure the div's scroll focus is at the bottom after executing a command.
//      const element = document.getElementById(id);
//      element.scrollTop = element.scrollHeight;

type Output = {
    id: string;
    output: string;
};

export const Terminal = () => {
    const [currentDirectory, setCurrentDirectory] = useState<TerminalDirectory>(startingDirectory);
    const [commandHistory, setCommandHistory] = useState<Array<Command>>([]);
    const [currentCommandIndex, setCurrentCommandIndex] = useState<number>(0);

    const [currentCommand, setCurrentCommand] = useState<Command>(createNewCommand(currentDirectory.name));
    const [outputs, setOutputs] = useState<Array<Output>>([]);

    return <div className="terminal">
        <h1>Hello world!</h1>
        <div>
            {outputs.map((output) => <div className="terminal__output" key={output.id}>{output.output}</div>)}
        </div>
        <div className="terminal__input-wrapper">
            <div>
                {'terminal@' + currentCommand.workingDirectory + '% '}
            </div>
            <input
                autoFocus
                onBlur={(event) => event.target.focus()}
                className="terminal__input"
                value={currentCommand.text}
                onChange={(event) => {
                    const newValue = event.target.value ?? '';

                    setCurrentCommand({ ...currentCommand, text: newValue });
                }}
                onKeyUp={(event) => {
                    if (event.key === 'Enter' && currentCommand.text) {
                        const result = executeCommand(
                            commandHistory,
                            currentCommand,
                            currentDirectory,
                            setCurrentDirectory
                        );

                        setOutputs([
                            ...outputs,
                            { id: crypto.randomUUID(), output: 'terminal@' + currentCommand.workingDirectory + '% ' + currentCommand.text },
                            { id: crypto.randomUUID(), output: result }
                        ]);
                        setCommandHistory([...commandHistory, currentCommand]);
                        setCurrentCommand(createNewCommand(currentDirectory.name));
                    }
                }}
            />
        </div>
    </div>;
};

const createNewCommand = (directoryName: string): Command => {
    return { id: crypto.randomUUID(), text: '', workingDirectory: directoryName };
};

const executeCommand = (
    commandHistory: Array<Command>,
    currentCommand: Command,
    currentDirectory: TerminalDirectory,
    setCurrentDirectory: (directory: TerminalDirectory) => void
): string => {
    const command: ICommand|undefined = validCommands.get(currentCommand.text);

    if (command) {
        return command.execute(
            currentCommand,
            commandHistory,
            currentDirectory,
            setCurrentDirectory,
            []
        );
    } else {
        return 'Command not found!'
    }
};
