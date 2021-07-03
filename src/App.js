class App extends React.Component {

    render() {
        return (
            <div className="d-flex flex-wrap justify-content-center align-content-center align-items-center w-100 h-100 position-absolute">
                <CodeEditor />
                <Animation />
            </div>
        );
    }
}