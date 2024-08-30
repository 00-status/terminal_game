
import './terminal-page.css';
import { Terminal } from "./Terminal";
import { CodeBlockGenerator } from './CodeBlockGenerator';

// TODO:
// tab-complete directories.
// Change generated display code to binary.
// Place text animations on display code.
// Make a thematic navbar component.
// Make a more interesting directory hierarchy.

export const TerminalPage = () => {
    document.title = "Terminal";
    return <div className="terminal-page">
        <div className="terminal-page__background">
            {[...Array(10).keys()].map((value: number) => <CodeBlockGenerator key={value} />)}
        </div>
        <div className="terminal-page__foreground">
            <Terminal />
        </div>
    </div>;
};
