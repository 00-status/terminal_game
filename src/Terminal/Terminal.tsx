import { useState } from "react";
import { TerminalDirectory } from "./domain/types";

export const Terminal = () => {
    const [currentDirectory, setCurrentDirectory] = useState<TerminalDirectory>();

    // Have an input directly below a div.
    // as commands are executed, the appear in the div.
    // When the div reaches max-height, the overflow is hidden.
    // Ensure the div's scroll focus is at the bottom after executing a command.
    //      const element = document.getElementById(id);
    //      element.scrollTop = element.scrollHeight;

    return <div>
        Hello world!
    </div>;
};
