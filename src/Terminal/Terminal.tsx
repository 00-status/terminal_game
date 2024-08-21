import { useState } from "react";
import { TerminalDirectory } from "./domain/types";

export const Terminal = () => {
    const [currentDirectory, setCurrentDirectory] = useState<TerminalDirectory>();

    const [commands, setCommands] = useState<Array<string>>([]);
    const [currentValue, setCurrentValue] = useState<string>('');

    // Have an input directly below a div.
    // as commands are executed, the appear in the div.
    // When the div reaches max-height, the overflow is hidden.
    // Ensure the div's scroll focus is at the bottom after executing a command.
    //      const element = document.getElementById(id);
    //      element.scrollTop = element.scrollHeight;

    return <div>
        <h1>Hello world!</h1>
        <div>
            {commands.map((command) => <div key={command}>{command}</div>)}
        </div>
        <input
            value={currentValue}
            onChange={(event) => {
                const newValue = event.target.value ?? '';
                setCurrentValue(newValue);
            }}
            onKeyUp={(event) => {
                if (event.key === 'Enter' && currentValue)
                {
                    setCommands([...commands, currentValue]);
                    setCurrentValue('');
                }
            }}
        />
    </div>;
};
