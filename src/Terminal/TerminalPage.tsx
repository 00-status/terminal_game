
import './terminal-page.css';
import { Terminal } from "./Terminal";
import { CodeBlockGenerator } from './CodeBlockGenerator';

export const TerminalPage = () => {
    return <div className="terminal-page">
        <div className="terminal-page__background">
            <h1>TESTING!</h1>
            <CodeBlockGenerator />
        </div>
        <div className="terminal-page__foreground">
            <Terminal />
        </div>
    </div>;
};
