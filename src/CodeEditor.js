class CodeEditor extends React.Component {
    render() {
        return (
            <div className="w-25 h-50">
                <textarea className="w-100 h-75" placeholder="code"></textarea>
                <SubmitButton />
            </div>
        )
    }
}