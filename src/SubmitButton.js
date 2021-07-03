class SubmitButton extends React.Component {
    render() {
        return <button type="button" onClick={() => {
            const data = { code: document.getElementsByTagName('textarea')[0].value }
            fetch('http://192.168.1.72:5000', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                document.getElementById('response').innerHTML = data['result']
            })
            .catch((error) => {
                console.log('Error:', error);
            });
        }} className="w-100 h-25">Send!</button>
    }
}