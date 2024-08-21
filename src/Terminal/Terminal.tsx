import { useState } from "react";

import './terminal.css';
import { Command, TerminalDirectory } from "./domain/types";

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

    const [commands, setCommands] = useState<Array<Command>>([]);
    const [currentCommand, setCurrentCommand] = useState<Command>(createNewCommand());

    // Find what the command is via a map: { key: CommandName }
    // Instantiate the command
    //      const command = eval(`new ${CommandName}()`);
    // execute the handler
    //      command.execute(id, text, currentDirectory, setCurrentDirectory, arguments);

    return <div className="terminal">
        <h1>Hello world!</h1>
        <div>
            {commands.map((command) => <div key={command.id}>{command.text}</div>)}
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
