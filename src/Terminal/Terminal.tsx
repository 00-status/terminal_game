import { useState } from "react";

import './terminal.css';
import { Command, ICommand, TerminalDirectory, validCommands } from "./domain/types";

    // ToDo: Implement "help" command.
    //      Have an array of outputs in addition to to the array of commands.
    //      When a command is typed
    //          Add the command text to the output array.
    //          Execute the command's associated Handler
    //          Add the returned value from the handler to the output array.

    // Have an input directly below a div.
    // as commands are executed, the appear in the div.
    // When the div reaches max-height, the overflow is hidden.
    // Ensure the div's scroll focus is at the bottom after executing a command.
    //      const element = document.getElementById(id);
    //      element.scrollTop = element.scrollHeight;

export const Terminal = () => {
    const [currentDirectory, setCurrentDirectory] = useState<TerminalDirectory>();

    const [outputs, setOutputs] = useState<Array<string>>([]);
    const [commands, setCommands] = useState<Array<Command>>([]);
    const [currentCommand, setCurrentCommand] = useState<Command>(createNewCommand());

    return <div className="terminal">
        <h1>Hello world!</h1>
        <div>
            {outputs.map((outputs) => <div key={outputs}>{outputs}</div>)}
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
                    const result = executeCommand(currentCommand, currentDirectory, setCurrentDirectory);

                    setOutputs([...outputs, currentCommand.text, result]);
                    setCommands([...commands, currentCommand]);
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
    currentCommand: Command,
    currentDirectory: TerminalDirectory,
    setCurrentDirectory: (directory: TerminalDirectory) => void
): string => {
    const command: ICommand|undefined = validCommands.get(currentCommand.text);
    
    if (command) {
        return command.execute(
            currentCommand.id,
            currentCommand.text,
            currentDirectory,
            setCurrentDirectory,
            []
        );
    } else {
        return 'Command not found!'
    }
};
