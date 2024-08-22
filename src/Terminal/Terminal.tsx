import { useState } from "react";

import './terminal.css';
import { Command, ICommand, TerminalDirectory, validCommands } from "./domain/types";

    // Have an input directly below a div.
    // as commands are executed, the appear in the div.
    // When the div reaches max-height, the overflow is hidden.
    // Ensure the div's scroll focus is at the bottom after executing a command.
    //      const element = document.getElementById(id);
    //      element.scrollTop = element.scrollHeight;

export const Terminal = () => {
    const [currentDirectory, setCurrentDirectory] = useState<TerminalDirectory>();
    const [commandHistory, setCommandHistory] = useState<Array<Command>>([]);

    const [currentCommand, setCurrentCommand] = useState<Command>(createNewCommand());
    const [outputs, setOutputs] = useState<Array<string>>([]);

    return <div className="terminal">
        <h1>Hello world!</h1>
        <div>
            {outputs.map((outputs) => <div className="terminal__output" key={outputs}>{outputs}</div>)}
        </div>
        <input
            value={currentCommand.text}
            onChange={(event) => {
                const newValue = event.target.value ?? '';

                setCurrentCommand({ ...currentCommand, text: newValue });
            }}
            onKeyUp={(event) => {
                if (event.key === 'Enter' && currentCommand.text)
                {
                    const result = executeCommand(
                        commandHistory,
                        currentCommand,
                        currentDirectory,
                        setCurrentDirectory
                    );

                    setOutputs([...outputs, currentCommand.text, result]);
                    setCommandHistory([...commandHistory, currentCommand]);
                    setCurrentCommand(createNewCommand());
                }
            }}
        />
    </div>;
};

const createNewCommand = (): Command => {
    return { id: crypto.randomUUID(), text: '', workingDirectory: '' };
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
