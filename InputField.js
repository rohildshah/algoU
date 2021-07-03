'use strict';

const e = React.createElement;

class InputField extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    return e(
        'button',
        { onClick: () => this.state.liked = true },
        "Like!"
    )


    return e(
        'textarea',
        { rows: 5, cols: 40, placeholder: "your code here"}
    ),
    e(
        'button',
        { onClick: () => {
            const data = { code: document.getElementsByTagName('textarea')[0].value }
            fetch('http://192.168.1.72:5000', {
                method: 'POST',
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.log('Error:', error);
            });
        } },
        'Send!'
    );
  }
}

const domContainer = document.querySelector('#input-field');
ReactDOM.render(e(InputField), domContainer);