import './code-block-generator.css';

export const CodeBlockGenerator = () => {

    // If statements
    // Method calls
    // variable assignments.

    return <div className="code-block-generator">
        {generateMethodCall()}
    </div>;
};

const generateMethodCall = (): string => {
    return 'public function createResource()\n{\n\tconst identifier = this.generateID()\n\n\tthis.requestParam(identifier)\n\n}';
};
