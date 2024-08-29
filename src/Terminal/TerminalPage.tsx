
import './terminal-page.css';
import { Terminal } from "./Terminal";
import { CodeBlockGenerator } from './CodeBlockGenerator';

export const TerminalPage = () => {
    return <div className="terminal-page">
        <div className="terminal-page__background">
            {[...Array(10).keys()].map((value: number) => <CodeBlockGenerator key={value} />)}
        </div>
        <div className="terminal-page__foreground">
            <Terminal />
        </div>
    </div>;
};
