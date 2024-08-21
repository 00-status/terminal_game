import { useState } from "react";

import './terminal.css';
import { Command, TerminalDirectory } from "./domain/types";

export const Terminal = () => {
    const [currentDirectory, setCurrentDirectory] = useState<TerminalDirectory>();

    const [commands, setCommands] = useState<Array<Command>>([]);
    const [currentCommand, setCurrentCommand] = useState<Command>(createNewCommand());

    // Have an input directly below a div.
    // as commands are executed, the appear in the div.
    // When the div reaches max-height, the overflow is hidden.
    // Ensure the div's scroll focus is at the bottom after executing a command.
    //      const element = document.getElementById(id);
    //      element.scrollTop = element.scrollHeight;

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
