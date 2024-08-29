import { useEffect, useRef, useState } from "react";

import './terminal.css';
import { Command, ICommand, TerminalDirectory, validCommands } from "./domain/types";
import { startingDirectory } from "./domain/directories";
import { findFileFromString } from "./domain/findFileFromString";

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

    const [currentCommand, setCurrentCommand] = useState<Command>(createNewCommand(currentDirectory.name));
    const [outputs, setOutputs] = useState<Array<Output>>([]);

    const inputRef = useRef<HTMLInputElement | null>(null);

    const onInputWrapperClick = () => {
        inputRef.current?.focus();
    };

    useEffect(() => {
        setCurrentCommand((state) => {
            return {...state, workingDirectory: currentDirectory.name}
        })
    }, [currentDirectory]);

    return <div className="terminal">
        <div className="terminal__header">
            <h1 className="terminal__title">Terminal</h1>
        </div>
        <div>
            {outputs.map((output) => <div className="terminal__output" key={output.id}>{output.output}</div>)}
        </div>
        <div onClick={onInputWrapperClick} className="terminal__input-wrapper">
            <div>
                {'terminal@' + currentCommand.workingDirectory + '% '}
            </div>
            <input
                ref={inputRef}
                autoFocus
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

                    if (event.key === 'Tab' && currentCommand.text) {
                        findFileFromString(currentCommand, setCurrentCommand, currentDirectory);
                    }
                }}
                onKeyDown={(event) => {
                    if (event.key === "Tab") {
                        event.preventDefault();
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
    const command: ICommand|undefined = validCommands.get(currentCommand.text.split(' ')[0]);

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
