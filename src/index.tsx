import { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Terminal } from './Terminal/Terminal';

const rootDomNode = document.getElementById('app');

if (!rootDomNode) {
    throw new Error('Could not find App!');
}

const router = createBrowserRouter([
    { path: "/", element: <Terminal /> }
]);

const root = createRoot(rootDomNode);
root.render(<RouterProvider router={router}/>);
