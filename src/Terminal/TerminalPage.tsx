
import './terminal-page.css';
import { Terminal } from "./Terminal";
import { CodeBlockGenerator } from './CodeBlockGenerator';
import { useNavigate } from 'react-router-dom';

// TODO:
// tab-complete directories.
// Make a more interesting directory hierarchy.

export const TerminalPage = () => {
    const navigate = useNavigate();

    document.title = "Terminal";
    return <div className="terminal-page">
        <div className="terminal-page__background">
            {[...Array(10).keys()].map((value: number) => <CodeBlockGenerator key={value} />)}
        </div>
        <div className="terminal-page__foreground">
            <div className="terminal-page__header">
                <h1 className="terminal-page__title">Terminal</h1>
                <div className="terminal-page__nav">
                    <a className='terminal-page__link' onClick={() => navigate("#")}>Landing</a>
                </div>
            </div>
            <Terminal />
        </div>
    </div>;
};
